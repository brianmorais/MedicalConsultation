import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { ResponseModel } from "../../application/models/responseModel";
import { ILoggerUseCase } from "../../application/interfaces/useCases/loggerUseCase.interface";
import { IPatientUseCase } from "../../application/interfaces/useCases/patientUseCase.interface";
import { PatientModel } from "../../application/models/patientModel";

@injectable()
export class PatientController {
  constructor(
    @inject("PatientUseCase") private patientUseCase: IPatientUseCase,
    @inject("LoggerUseCase") private logger: ILoggerUseCase
  ) {}

  async getByDocument(request: Request, response: Response): Promise<Response> {
    try {
      const param = request.params['document'];
      const doctor = await this.patientUseCase.getByDocument(param);
      return response.status(200).json(doctor);
    } catch (error: any) {
      this.logger.error(`[PatientController][getByDocument] - Error on get patient by document: ${error.message}`);
      return response.status(500).json(new ResponseModel({}, [error.message]));
    }
  }

  async addPatient(request: Request, response: Response): Promise<Response> {
    try {
      const body = request.body as PatientModel;
      const inserted = await this.patientUseCase.addPatient(body);
      if (inserted.notifications.length > 0) {
        this.logger.warn(`[PatientController][addPatient] - Error on add patient: ${inserted.notifications.join(',')}`);
        return response.status(400).json(inserted);
      }

      return response.status(200).json(inserted);
    } catch (error: any) {
      this.logger.error(`[PatientController][addPatient] - Error on add patient: ${error.message}`);
      return response.status(500).json(new ResponseModel({}, [error.message]));
    }
  }

  async updatePatient(request: Request, response: Response): Promise<Response> {
    try {
      const body = request.body as PatientModel;
      const updated = await this.patientUseCase.updatePatient(body);
      if (updated.notifications.length > 0) {
        this.logger.warn(`[PatientController][updatePatient] - Error on update patient: ${updated.notifications.join(',')}`);
        return response.status(400).json(updated);
      }

      return response.status(200).json(updated);
    } catch (error: any) {
      this.logger.error(`[PatientController][updatePatient] - Error on update patient: ${error.message}`);
      return response.status(500).json(new ResponseModel({}, [error.message]));
    }
  }

  async getReportData(request: Request, response: Response): Promise<Response> {
    try {
      const patientDocuments = request.body as string[];
      const data = await this.patientUseCase.getReportData(patientDocuments);
      if (data.notifications.length > 0) {
        this.logger.warn(`[PatientController][getReportData] - Error on update patient: ${data.notifications.join(',')}`);
        return response.status(400).json(data);
      }
      return response.status(200).json(data);
    } catch (error: any) {
      this.logger.error('[PatientController][getReportData] - Error on get report data');
      return response.status(500).json(new ResponseModel({}, [error.message]));
    }
  }
}