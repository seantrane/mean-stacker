import { NextFunction, Request, Response } from 'express';

export interface WriteRequestInterface {
  get(req: Request, res: Response, next?: NextFunction);
  delete(req: Request, res: Response, next?: NextFunction);
  post(req: Request, res: Response, next?: NextFunction);
  put(req: Request, res: Response, next?: NextFunction);
}
