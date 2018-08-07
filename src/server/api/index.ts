import { Router } from 'express';

import {
  errorHandler,
  JsonApiResponse
} from '../../utils';
// import * as auth from '../auth';
// import * as users from './users';
// (re)exports
// export {
//   users
// };

// get an instance of the router for api routes
const apiRouter = Router();

/**
 * Handle API routing
 *
 * @return {Router} express.Router returned with routes applied
 */
export function router(): Router {

  // route to show a random message (GET http://localhost:8080/api/)
  apiRouter.get('/', (req, res) => {
    res.json(new JsonApiResponse({data: true, meta: {message: 'API is responding.'}}));
  });

  // apiRouter.all('/*', auth.verifyToken);

  // apiRouter.use('/users', users.router());

  return apiRouter;
}
