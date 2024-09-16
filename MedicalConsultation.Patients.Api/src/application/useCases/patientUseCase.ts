import { inject, injectable } from "tsyringe";
import { PatientModel } from "../models/patientModel";
import { IPatientRepository } from "../../domain/interfaces/infra/repositories/patientRepository.interface";
import { PatientDataMapping } from "../dataMappings/patientDataMapping";
import { PatientValidator } from "../validators/patientValidator";
import { ResponseModel } from "../models/responseModel";
import { ILoggerUseCase } from "../interfaces/useCases/loggerUseCase.interface";
import { IPatientUseCase } from "../interfaces/useCases/patientUseCase.interface";

@injectable()
export class PatientUseCase implements IPatientUseCase {
  constructor(
    @inject("PatientRepository") private patientRepository: IPatientRepository,
    @inject("LoggerUseCase") private logger: ILoggerUseCase
  ) {}

  async updatePatient(patient: PatientModel): Promise<ResponseModel> {
    this.logger.info('[PatientUseCase][updatePatient] - Start the update patient');
    const notifications = PatientValidator.validatePut(patient);
    if (notifications.length > 0) {
      this.logger.warn('[PatientUseCase][updatePatient] - Error on validate request');
      return new ResponseModel({}, notifications);
    }

    const patientEntity = PatientDataMapping.FromModelToEntity(patient);
    const updated = await this.patientRepository.updatePatient(patientEntity);
    if (!updated) {
      this.logger.info('[PatientUseCase][updatePatient] - Error on update patient');
      notifications.push('Error on update patient');
      return new ResponseModel({}, notifications);
    }

    const patientModel = PatientDataMapping.FromEntityToModel(updated);
    this.logger.info('[PatientUseCase][updatePatient] - Success on update the patient');
    return new ResponseModel(patientModel);
  }

  async addPatient(patient: PatientModel): Promise<ResponseModel> {
    this.logger.info('[PatientUseCase][addPatient] - Start the add patient');
    const notifications = PatientValidator.validatePost(patient);
    if (notifications.length > 0) {
      this.logger.warn('[PatientUseCase][addPatient] - Error on validate request');
      const response = new ResponseModel({}, notifications);
      return response;
    }

    const patientEntity = PatientDataMapping.FromModelToEntity(patient);
    const inserted = await this.patientRepository.addPatient(patientEntity);
    if (!inserted) {
      this.logger.warn('[PatientUseCase][addPatient] - Error on add patient');
      notifications.push('Error on add patient');
      return new ResponseModel({}, notifications);
    }

    const patientModel = PatientDataMapping.FromEntityToModel(inserted);
    this.logger.info('[PatientUseCase][addPatient] - Success on add the patient');
    return new ResponseModel(patientModel);
  }
  
  async getByDocument(document: string): Promise<ResponseModel> {
    this.logger.info(`[PatientUseCase][getByDocument] - Start the get patient by document: ${document}`);
    const patient = await this.patientRepository.getByDocument(document);
    if (!patient) {
      return new ResponseModel({}, ['Patient not found']);
    }

    const patientModel = PatientDataMapping.FromEntityToModel(patient);
    return new ResponseModel(patientModel);
  }

  async getReportData(patientDocuments: string[]): Promise<ResponseModel> {
    this.logger.info('[PatientUseCase][getReportData] - Start the get report data');
    if (!patientDocuments || patientDocuments.length <= 0) {
      this.logger.warn('[PatientUseCase][getReportData] - Patient documents is null or undefined');
      return new ResponseModel({}, ['Patient documents is null or undefined']);
    }

    const patients = await this.patientRepository.getReportData(patientDocuments);
    if (!patients) {
      return new ResponseModel({}, ['Report data not found']);
    }

    const patientsModelArray = PatientDataMapping.FromEntityArrayToModelArray(patients);
    this.logger.info('[PatientUseCase][getReportData] - Success on get report data');
    return new ResponseModel(patientsModelArray);
  }
}