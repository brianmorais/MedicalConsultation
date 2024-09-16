import { inject, injectable } from "tsyringe";
import { IDoctorUseCase } from "../interfaces/useCases/doctorUseCase.interface";
import { DoctorModel } from "../models/doctorModel";
import { IDoctorRepository } from "../../domain/interfaces/infra/repositories/doctorRepository.interface";
import { DoctorDataMapping } from "../dataMappings/doctorDataMapping";
import { DoctorValidator } from "../validators/doctorValidator";
import { ResponseModel } from "../models/responseModel";
import { ILoggerUseCase } from "../interfaces/useCases/loggerUseCase.interface";

@injectable()
export class DoctorUseCase implements IDoctorUseCase {
  constructor(
    @inject("DoctorRepository") private doctorRepository: IDoctorRepository,
    @inject("LoggerUseCase") private logger: ILoggerUseCase
  ) {}

  async updateDoctor(doctor: DoctorModel): Promise<ResponseModel> {
    this.logger.info('[DoctorUseCase][updateDoctor] - Start the update doctor');
    const notifications = DoctorValidator.validatePut(doctor);
    if (notifications.length > 0) {
      this.logger.warn('[DoctorUseCase][updateDoctor] - Error on validate request');
      return new ResponseModel({}, notifications);
    }

    const doctorEntity = DoctorDataMapping.FromModelToEntity(doctor);
    const updated = await this.doctorRepository.updateDoctor(doctorEntity);
    if (!updated) {
      this.logger.info('[DoctorUseCase][updateDoctor] - Error on update doctor');
      notifications.push('Error on update doctor');
      return new ResponseModel({}, notifications);
    }

    const doctorModel = DoctorDataMapping.FromEntityToModel(updated);
    this.logger.info('[DoctorUseCase][updateDoctor] - Success on update the doctor');
    return new ResponseModel(doctorModel);
  }

  async addDoctor(doctor: DoctorModel): Promise<ResponseModel> {
    this.logger.info('[DoctorUseCase][addDoctor] - Start the add doctor');
    const notifications = DoctorValidator.validatePost(doctor);
    if (notifications.length > 0) {
      this.logger.warn('[DoctorUseCase][addDoctor] - Error on validate request');
      const response = new ResponseModel({}, notifications);
      return response;
    }

    const doctorEntity = DoctorDataMapping.FromModelToEntity(doctor);
    const inserted = await this.doctorRepository.addDoctor(doctorEntity);
    if (!inserted) {
      this.logger.info('[DoctorUseCase][addDoctor] - Error on add doctor');
      notifications.push('Error on add doctor');
      return new ResponseModel({}, notifications);
    }

    const doctorModel = DoctorDataMapping.FromEntityToModel(inserted);
    this.logger.info('[DoctorUseCase][addDoctor] - Success on add the doctor');
    return new ResponseModel(doctorModel);
  }
  
  async getBySpeciality(speciality: string): Promise<ResponseModel> {
    this.logger.info(`[DoctorUseCase][getBySpeciality] - Start the get doctor by speciality: ${speciality}`);
    const doctor = await this.doctorRepository.getBySpeciality(speciality);
    if (!doctor) {
      return new ResponseModel({}, ['Doctor not found']);
    }

    const doctorModel = DoctorDataMapping.FromEntityToModel(doctor);
    return new ResponseModel(doctorModel);
  }

  async getById(id: string): Promise<ResponseModel> {
    this.logger.info(`[DoctorUseCase][getById] - Start the get doctor by id: ${id}`);
    const doctor = await this.doctorRepository.getById(id);
    if (!doctor) {
      return new ResponseModel({}, ['Doctor not found']);
    }

    const doctorModel = DoctorDataMapping.FromEntityToModel(doctor);
    return new ResponseModel(doctorModel);
  }
}