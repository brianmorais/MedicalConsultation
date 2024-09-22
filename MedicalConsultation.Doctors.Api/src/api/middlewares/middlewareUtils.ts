import { Request, Response, NextFunction } from "express";

export class MiddlewareUtils {
  static asyncMiddleware(fn: any) {
    return (request: Request, response: Response, next: NextFunction) => {
      Promise.resolve(fn(request, response, next)).catch(next);
    };
  }
}