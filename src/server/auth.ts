import { NextFunction, Request, Response, Router } from 'express';
import { includes, toLower } from 'lodash';
import { sign as jwt_sign, verify as jwt_verify } from 'jsonwebtoken';

import {
  errorHandler,
  JsonApiResponse,
  UserService
} from '../services/user';

const userService = new UserService();

// get an instance of the router for auth routes
const authRouter = Router();

/**
 * Handle Auth routing
 *
 * @return {Router} express.Router returned with routes applied
 */
export function router(): Router {
  // route to authenticate a user (POST /authenticate)
  authRouter.post('/', authenticate);

  return authRouter;
}

/**
 * Route Handler to Authenticate a User
 * @param  {Request}  req express.Request object
 * @param  {Response} res express.Response object
 * @return void
 */
export function authenticate(req: Request, res: Response) {
  // find the user
  userService.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      throw err;
    }
    if (!user) {
      res.status(400).json(new JsonApiResponse({
        data: false,
        meta: {message: 'Authentication failed. User not found.'}
      }));
    } else if (user) {
      // check if password matches
      if (user.password !== req.body.password) {
        res.status(400).json(new JsonApiResponse({
          data: false,
          meta: {message: 'Authentication failed. Wrong password.'}
        }));
      } else {
        // if user is found and password is right, create a token
        const token = jwt_sign(user, req.app.get('secretKey'), {
          expiresIn: 86400 // moment.duration(24, 'hours').asSeconds()
        });
        setTokenCookie(token, res);
        // return the information including token as JSON
        res.status(201).json({ success: true, message: 'Enjoy your token!', token });
      }
    }
  });
}

/**
 * Route Handler to Create a Sample User
 * @param  {Request}  req express.Request object
 * @param  {Response} res express.Response object
 * @return void
 */
export function createSampleUser(req: Request, res: Response) {
  // save a sample user
  userService.create([{
    name: 'Kaiser Sosay',
    email: 'sosayk@mail.com',
    password: [...Array(14)].map(i=>(~~(Math.random()*36)).toString(36)).join(''),
    admin: true
  }], (err, docs) => {
    if (err) {
      throw err;
    }
    // console.log('User created successfully', docs.map(user => user['name']));
    res.json(new JsonApiResponse({
      data: true,
      meta: {message: 'User created successfully'}
    }));
  });
}

export function setTokenCookie(token: string, res: Response) {
  let cookieOpts = {};
  if ( ! includes(['local', 'test'], toLower(process.env.NODE_ENV))) {
    cookieOpts = { httpOnly: true, secure: true };
  }
  res.cookie('token', token, cookieOpts);
}

/**
 * Route Middleware to Verify a Token
 * @param  {Request}      req  express.Request object
 * @param  {Response}     res  express.Response object
 * @param  {NextFunction} next express.NextFunction callback function
 * @return void
 */
export function verifyToken(req: Request, res: Response, next: NextFunction) {
  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt_verify(token, req.app.get('secretKey'), (err, decoded) => {
      if (err) {
        return res.status(401).json(new JsonApiResponse({
          data: false,
          meta: {message: 'Failed to authenticate token.'}
        }));
      } else {
        // if everything is good, save to request for use in other routes
        req['decoded'] = decoded;
        next();
      }
    });
  } else {
    // if there is no token, return an error
    return res.status(403).send(new JsonApiResponse({
      data: false,
      meta: {message: 'No token provided.'}
    }));
  }
}
