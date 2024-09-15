import { container } from "tsyringe";
import { IPatientRepository } from "../domain/interfaces/infra/repositories/patientRepository.interface";
import { PatientRepository } from "../infra/data/repositories/patientRepository";
import { ILogger } from "../domain/interfaces/infra/logger/logger.interface";
import { WinstonLogger } from "../infra/logger/winstonLogger";
import { LoggerUseCase } from "../application/useCases/loggerUseCase";
import { ILoggerUseCase } from "../application/interfaces/useCases/loggerUseCase.interface";
import { DatabaseConnection } from "../infra/data/databaseConnetion";
import { IPatientUseCase } from "../application/interfaces/useCases/patientUseCase.interface";
import { PatientUseCase } from "../application/useCases/patientUseCase";

export class Setup {
  public static configure(): void {
    container.register<IPatientUseCase>("PatientUseCase", { useClass: PatientUseCase });
    container.register<IPatientRepository>("PatientRepository", { useClass: PatientRepository });
    container.register<ILogger>("Logger", { useClass: WinstonLogger });
    container.register<ILoggerUseCase>("LoggerUseCase", { useClass: LoggerUseCase });
    container.register<DatabaseConnection>("DatabaseConnection", { useClass: DatabaseConnection });
  }
}

export { container };