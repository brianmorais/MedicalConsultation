import { ILoggerUseCase } from "../../application/interfaces/useCases/loggerUseCase.interface";

export class LoggerMock implements ILoggerUseCase {
  info(message: string): void {
    console.log(message);
  }
  error(message: string): void {
    console.log(message);
  }
  warn(message: string): void {
    console.log(message);
  }
  debug(message: string): void {
    console.log(message);
  }
}