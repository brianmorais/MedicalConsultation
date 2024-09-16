import { inject, injectable } from "tsyringe";
import { ILoggerUseCase } from "../interfaces/useCases/loggerUseCase.interface";
import { ILogger } from "../../domain/interfaces/infra/logger/logger.interface";

@injectable()
export class LoggerUseCase implements ILoggerUseCase {
  constructor(@inject("Logger") private logger: ILogger) {}

  info(message: string): void {
    this.logger.info(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  debug(message: string): void {
    this.logger.debug(message);
  }
}