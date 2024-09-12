import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IAuthUseCase } from "../../application/interfaces/useCases/authUseCase.interface";
import { ResponseModel } from "../../application/models/responseModel";
import { ILoggerUseCase } from "../../application/interfaces/useCases/loggerUseCase.interface";

@injectable()
export class AuthController {
  constructor(
    @inject("AuthUseCase") private authUseCase: IAuthUseCase,
    @inject("LoggerUseCase") private logger: ILoggerUseCase
  ) {}

  async login(request: Request, response: Response): Promise<Response> {
    try {
      const user = request.body.user;
      const password = request.body.password;
      const data = await this.authUseCase.login(user, password);
      const status = data.notifications.length > 0 ? 400 : 200;
      return response.status(status).json(data);
    } catch (error: any) {
      this.logger.error(`[AuthController][login] - Error on autenticate user: ${error.message}`);
      return response.status(500).json(new ResponseModel({}, [error.message]));
    }
  }

  async validate(request: Request, response: Response): Promise<Response> {
    try {
      const token = request.body.token;
      const data = await this.authUseCase.validate(token);
      const status = data.notifications.length > 0 ? 400 : 200;
      return response.status(status).json(data);
    } catch (error: any) {
      this.logger.error(`[AuthController][validate] - Error on validate token: ${error.message}`);
      return response.status(500).json(new ResponseModel({}, [error.message]));
    }
  }
}