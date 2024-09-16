import { container } from "tsyringe";
import { IDoctorUseCase } from "../application/interfaces/useCases/doctorUseCase.interface";
import { DoctorUseCase } from "../application/useCases/doctorUseCase";
import { IDoctorRepository } from "../domain/interfaces/infra/repositories/doctorRepository.interface";
import { DoctorRepository } from "../infra/data/repositories/doctorRepository";
import { ILogger } from "../domain/interfaces/infra/logger/logger.interface";
import { WinstonLogger } from "../infra/logger/winstonLogger";
import { LoggerUseCase } from "../application/useCases/loggerUseCase";
import { ILoggerUseCase } from "../application/interfaces/useCases/loggerUseCase.interface";
import { DatabaseConnection } from "../infra/data/databaseConnetion";

export class Setup {
  public static configure(): void {
    container.register<IDoctorUseCase>("DoctorUseCase", { useClass: DoctorUseCase });
    container.register<IDoctorRepository>("DoctorRepository", { useClass: DoctorRepository });
    container.register<ILogger>("Logger", { useClass: WinstonLogger });
    container.register<ILoggerUseCase>("LoggerUseCase", { useClass: LoggerUseCase });
    container.register<DatabaseConnection>("DatabaseConnection", { useClass: DatabaseConnection });
  }
}

export { container };