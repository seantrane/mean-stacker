// global dependencies
import { NextFunction, Request, Response, Router } from 'express';
// local dependencies
import { UserController } from './user.controller';
// (re)exports
export { UserController };

// get an instance of the router for api routes.
const userRouter = Router();
// get an instance of the controller to handle requests/responses.
const userController = new UserController();

/**
 * User Route Handler
 *
 * @return {Router} express.Router returned with routes applied
 */
export function router(): Router {

  userRouter.get('/', userController.find);
  userRouter.post('/', userController.create);

  userRouter.get('/:id', userController.findById);
  userRouter.put('/:id', userController.update);
  userRouter.delete('/:id', userController.delete);

  return userRouter;
}
