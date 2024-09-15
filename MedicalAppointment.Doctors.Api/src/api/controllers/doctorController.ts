import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IDoctorUseCase } from "../../application/interfaces/useCases/doctorUseCase.interface";
import { ResponseModel } from "../../application/models/responseModel";
import { DoctorModel } from "../../application/models/doctorModel";
import { ILoggerUseCase } from "../../application/interfaces/useCases/loggerUseCase.interface";

@injectable()
export class DoctorController {
  constructor(
    @inject("DoctorUseCase") private doctorUseCase: IDoctorUseCase,
    @inject("LoggerUseCase") private logger: ILoggerUseCase
  ) {}

  async getById(request: Request, response: Response): Promise<Response> {
    try {
      const param = request.params['doctorId'];
      const doctor = await this.doctorUseCase.getById(param);
      return response.status(200).json(doctor);
    } catch (error: any) {
      this.logger.error(`[DoctorControler][getById] - Error on get doctor by id: ${error.message}`);
      return response.status(500).json(new ResponseModel({}, [error.message]));
    }
  }

  async getBySpeciality(request: Request, response: Response): Promise<Response> {
    try {
      const param = request.params['speciality'];
      const doctor = await this.doctorUseCase.getBySpeciality(param);
      return response.status(200).json(doctor);
    } catch (error: any) {
      this.logger.error(`[DoctorControler][getBySpeciality] - Error on get doctor by speciality: ${error.message}`);
      return response.status(500).json(new ResponseModel({}, [error.message]));
    }
  }

  async addDoctor(request: Request, response: Response): Promise<Response> {
    try {
      const body = request.body as DoctorModel;
      const inserted = await this.doctorUseCase.addDoctor(body);
      if (inserted.notifications.length > 0) {
        this.logger.warn(`[DoctorControler][addDoctor] - Error on add doctor: ${inserted.notifications.join(',')}`);
        return response.status(400).json(inserted);
      }

      return response.status(200).json(inserted);
    } catch (error: any) {
      this.logger.error(`[DoctorControler][addDoctor] - Error on add doctor: ${error.message}`);
      return response.status(500).json(new ResponseModel({}, [error.message]));
    }
  }

  async updateDoctor(request: Request, response: Response): Promise<Response> {
    try {
      const body = request.body as DoctorModel;
      const updated = await this.doctorUseCase.updateDoctor(body);
      if (updated.notifications.length > 0) {
        this.logger.warn(`[DoctorControler][updateDoctor] - Error on update doctor: ${updated.notifications.join(',')}`);
        return response.status(400).json(updated);
      }

      return response.status(200).json(updated);
    } catch (error: any) {
      this.logger.error(`[DoctorControler][updateDoctor] - Error on update doctor: ${error.message}`);
      return response.status(500).json(new ResponseModel({}, [error.message]));
    }
  }
}