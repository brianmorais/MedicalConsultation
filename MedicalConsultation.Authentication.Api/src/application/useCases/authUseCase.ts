import { inject, injectable } from "tsyringe";
import { ResponseModel } from "../models/responseModel";
import { ILoggerUseCase } from "../interfaces/useCases/loggerUseCase.interface";
import { IAuthUseCase } from "../interfaces/useCases/authUseCase.interface";
import { IUserRepository } from "../../domain/interfaces/infra/repositories/userRepository.interface";
import { AuthValidator } from "../validators/authValidator";
import * as crypto from 'crypto';
import jwt from 'jsonwebtoken';

@injectable()
export class AuthUseCase implements IAuthUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
    @inject("LoggerUseCase") private logger: ILoggerUseCase
  ) {}

  async validate(token: string): Promise<ResponseModel> {
    try {
      if (token.toLowerCase().startsWith('bearer')) {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET as string);
        this.logger.info(`[AuthUseCase][validate] - Success on valiate token: ${token}`);
        return await Promise.resolve(new ResponseModel(decoded));
      } else if (token.toLowerCase().startsWith('basic')) {
        const tokenValue = token.split(' ')[1];
        const credentials = Buffer.from(tokenValue, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');
        if (username !== process.env.BASIC_USERNAME && password !== process.env.BASIC_PASSWORD) {
          throw new Error('token is invalid');
        }
        this.logger.info(`[AuthUseCase][validate] - Success on valiate token: ${token}`);
        return await Promise.resolve(new ResponseModel({role: 'system'}));
      }
      throw new Error('token is invalid');
    } catch (error: any) {
      return new ResponseModel({}, [error.message]);
    }
  }

  async login(user: string, password: string): Promise<ResponseModel> {
    this.logger.info(`[AuthUseCase][login] - Start the login user: ${user}`);
    const notifications = AuthValidator.validateLogin(user, password);
    if (notifications.length > 0) {
      return new ResponseModel({}, notifications);
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex');
    const userDatabase = await this.userRepository.login(user, hash);
    if (userDatabase) {
      const token = jwt.sign({
        id: userDatabase.id,
        firstName: userDatabase.firstName,
        lastName: userDatabase.lastName,
        role: userDatabase.role,
        email: userDatabase.email
      }, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRES_IN
      });

      return new ResponseModel({
        token: token,
        type: 'Bearer'
      });
    }

    notifications.push('user not found');
    return new ResponseModel({}, notifications);
  }
}