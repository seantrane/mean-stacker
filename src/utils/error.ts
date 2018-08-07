import { JsonApiResponse } from './jsonapi-response';
import { NextFunction, Response } from 'express';

/**
 * Generic error handler
 * @param  {Response} res     Response
 * @param  {string}   reason  Error reason
 * @param  {string}   message Error message
 * @param  {number?}  code    Error code
 * @param  {Object?}  obj     Data response object
 * @return {void}
 */
export function errorHandler(
  res: Response, reason: string, message: string, code?: number, obj?: any
): void {
  console.log(`ERROR: ${reason}`);
  res.status(code || 500).json(new JsonApiResponse({
    meta: {
      data: obj
    },
    errors: [
      {
        code: code || 500,
        reason,
        message
      }
    ]
  }));
}
