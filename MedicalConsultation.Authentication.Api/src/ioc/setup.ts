import { container } from "tsyringe";
import { ILogger } from "../domain/interfaces/infra/logger/logger.interface";
import { WinstonLogger } from "../infra/logger/winstonLogger";
import { IAuthUseCase } from "../application/interfaces/useCases/authUseCase.interface";
import { AuthUseCase } from "../application/useCases/authUseCase";
import { ILoggerUseCase } from "../application/interfaces/useCases/loggerUseCase.interface";
import { LoggerUseCase } from "../application/useCases/loggerUseCase";
import { DatabaseConnection } from "../infra/data/databaseConnetion";
import { IUserRepository } from "../domain/interfaces/infra/repositories/userRepository.interface";
import { UserRepository } from "../infra/data/repositories/userRepository";

export class Setup {
  public static configure(): void {
    container.register<IAuthUseCase>("AuthUseCase", { useClass: AuthUseCase });
    container.register<IUserRepository>("UserRepository", { useClass: UserRepository });
    container.register<ILogger>("Logger", { useClass: WinstonLogger });
    container.register<ILoggerUseCase>("LoggerUseCase", { useClass: LoggerUseCase });
    container.register<DatabaseConnection>("DatabaseConnection", { useClass: DatabaseConnection });
  }
}

export { container };