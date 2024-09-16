import mongoose from "mongoose";
import { inject, injectable } from "tsyringe";
import { ILogger } from "../../domain/interfaces/infra/logger/logger.interface";

@injectable()
export class DatabaseConnection {
  constructor(@inject("Logger") private logger: ILogger) {}

  async Connect() {
    if (mongoose.connection.readyState === 1) {
      this.logger.info('[DatabaseConnection][Connect] - The connection has already been established');
      return;
    }
    try {
      await mongoose.connect(process.env.DB_CONNECTION as string);
      this.logger.info('[DatabaseConnection][Connect] - Connection opened successfully');
    } catch (error: any) {
      this.logger.error(`[DatabaseConnection][Connect] - Error connecting to database: ${error.message}`);
    }
  }
}