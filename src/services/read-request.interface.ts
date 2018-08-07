import { NextFunction, Request, Response } from 'express';

export interface ReadRequestInterface {
  get(req: Request, res: Response, next?: NextFunction);
}
