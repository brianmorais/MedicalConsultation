import winston from "winston";
import { ILogger } from "../../domain/interfaces/infra/logger/logger.interface";
//import LokiTransport from "winston-loki";

export class WinstonLogger implements ILogger {
  private logger;

  constructor() {
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          )
        }),
        // new LokiTransport({
        //   host: 'http://localhost:3100',
        //   json: true
        // })
      ]
    });
  }

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