import { NextFunction, Request, Response } from "express";

export declare function validateToken(req: Request, res: Response, next: NextFunction): Promise<Response>;
export declare function validateRole(role: string): Response;