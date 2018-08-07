// -----------------------------------------------------------------------------
// Environment variables
// -----------------------------------------------------------------------------
const appEnv: string = process.env.ENV || process.env.NODE_ENV || 'local';
const PORT = process.env.PORT || '3000';
const appName = require('../../package.json').name || 'app';
const appVersion = require('../../package.json').version || 'latest';

// -----------------------------------------------------------------------------
// New Relic support
// -----------------------------------------------------------------------------

let newrelic;

if (['dev', 'uat', 'prod'].indexOf(appEnv) > -1) {
  process.env.NEW_RELIC_APP_NAME = `${appName}-${appEnv}`;
  newrelic = undefined;
  // newrelic = require('newrelic');
}

// -----------------------------------------------------------------------------
// External imports
// -----------------------------------------------------------------------------
// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { enableProdMode } from '@angular/core';

import * as compression from 'compression';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';
import * as logger from 'morgan';
import * as helmet from 'helmet';

// Fixes TS error about `lookup` not existing on `serveStatic.mime`:
const serveStatic = require('serve-static');

// -----------------------------------------------------------------------------
// Internal imports
// -----------------------------------------------------------------------------
// import { JsonApiResponse, errorHandler } from '../utils';
import { router as authRouter } from './auth';
import { router as apiRouter } from './api';

// -----------------------------------------------------------------------------
// VARS
// -----------------------------------------------------------------------------
const DIST_PATH   = path.join(process.cwd(), 'dist');
const CLIENT_PATH = path.join(DIST_PATH, 'client');

const headers = {
  'X-Powered-By': appEnv,
  'ETag': null
};

// -----------------------------------------------------------------------------
// Express init
// -----------------------------------------------------------------------------
// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();
// Express server
const app = express();
// Express variables
app.locals.name     = appName;
app.locals.version  = appVersion;
app.locals.tag      = `${appName}:${appVersion}`;
app.locals.env      = appEnv;
// This lets you call newrelic from within a template
app.locals.newrelic = newrelic;

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../../dist/server/main');
// Express Engine + Import module map for lazy loading
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', (_, options, callback) => {
  const engine = ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
      provideModuleMap(LAZY_MODULE_MAP),
      { provide: 'REQUEST', useValue: (options.req) },
      { provide: 'RESPONSE', useValue: (options.res) }
    ]
  });
  engine(_, options, callback);
});

app.set('view engine', 'html');
app.set('views', path.join(DIST_PATH, 'client'));

app.use(logger(appEnv));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Cross Origin middleware
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(cookieParser());
app.use(compression());
// WTF
app.use((err: Error, req: express.Request, res: express.Response, next: any): void => {
  console.log('err', err);
  res.status(500).send(`Something broke! ${err.stack}`);
});
// Catch exceptions
process.on('uncaughtException', (err: any): void => {
  console.log(`Caught exception: ${err}`, err.stack);
});
// Helmet init: https://helmetjs.github.io/docs/
app.use(helmet());
// Only send the Referer header for pages on the same origin.
// Sets "Referrer-Policy: origin".
app.use(helmet.referrerPolicy({ policy: 'origin' }));
// Helmet's noCache is a relatively simple middleware that will set the four HTTP headers:
//   Cache-Control, Surrogate-Control, Pragma, and Expires.
// app.use(helmet.noCache());
// Secret key
app.set('secretKey', process.env.SECRET_KEY || '3fyP9b4KQO14YiFUSBbOn8KokIZgb8SG');
// only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
app.enable('trust proxy');

// -----------------------------------------------------------------------------
// Rate-limiting
// -----------------------------------------------------------------------------
const RateLimit = require('express-rate-limit');
const limiter = new RateLimit({
  // @see https://www.npmjs.com/package/express-rate-limit#configuration
  windowMs: 2 * 60 * 1000, // milliseconds to keep records of requests in memory. Default is 1 minute.
  max: 30, // limit each IP to n requests per windowMs before 429 response. Default is 5. Set to 0 to disable.
  delayMs: 0 // ms to delay response, (delayMs * (hits - delayAfter)). Default is 1 second. Set to 0 to disable.
});
// apply to all requests
app.use(limiter);

// -----------------------------------------------------------------------------
// MongoDB init
// -----------------------------------------------------------------------------
// Create a database connection to reuse the connection pool in your app.
// const dbConnection: mongoose.Connection = api.getDbConnection();
// Connect to the database before starting the application server.
// try {
//   dbConnection.on('connected', (): void => {
//     if (process.env.NODE_ENV !== 'prod') {
//       console.log('Database connection ready');
//     }
//   });
// } catch (err) {
//   console.log(err.message, 'Failed to connect to database.');
//   process.exit(1);
// }

// -----------------------------------------------------------------------------
// App routes
// -----------------------------------------------------------------------------

// app.get('/health', (req, res): void => {
//   const appHealthResponse = new JsonApiResponse({
//     data: true,
//     meta: {
//       status: 'success',
//       message: 'Application is healthy',
//       app: {
//         APPLICATION_NAME: app.locals.name,
//         APPLICATION_VERSION: app.locals.version,
//         APPLICATION_TAG: app.locals.tag
//       }
//     },
//   });
//   // Test database connection
//   // try {
//   //   dbConnection.on('connected', () => {
//   //     res.send(appHealthResponse);
//   //   });
//   // } catch (err) {
//   //   errorHandler(res, err.message, 'Failed to connect to database.');
//   // }
// });

// app.use('/auth', authRouter());

app.use('/api', apiRouter());

// Server static files from /dist/client
app.get('*.*', express.static(CLIENT_PATH, {
  etag: false,
  maxAge: '1d',
  setHeaders: (res, uri_path) => setCacheHeadersByMimeType
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});


// -----------------------------------------------------------------------------
// Functions
// -----------------------------------------------------------------------------

/**
 * Set Cache Headers by MimeType
 * @requires serve-static       serveStatic
 * @param    {express.Response} res
 * @param    {string}           uri_path
 */
function setCacheHeadersByMimeType(res: express.Response, uri_path: string) {
  switch (serveStatic.mime.lookup(uri_path)) {
    case 'application/javascript':
    case 'application/x-javascript':
    case 'text/javascript':
    case 'text/x-javascript':
    case 'text/html': {
      res.setHeader('Cache-Control', 'public, max-age=0');
      break;
    }
    case 'application/pdf':
    case 'image/gif':
    case 'image/jpeg':
    case 'image/png':
    case 'image/svg+xml':
    case 'image/x-icon': {
      res.setHeader('Cache-Control', 'public, max-age=30d');
      break;
    }
    case 'audio/mpeg':
    case 'audio/ogg':
    case 'audio/wav':
    case 'video/avi': {
      res.setHeader('Cache-Control', 'public, max-age=90d');
      break;
    }
  }
}
