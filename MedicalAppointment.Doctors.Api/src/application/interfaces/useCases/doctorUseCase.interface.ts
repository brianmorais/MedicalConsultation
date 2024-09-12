import { DoctorModel } from "../../models/doctorModel";
import { ResponseModel } from "../../models/responseModel";

export interface IDoctorUseCase {
  getBySpeciality(speciality: string): Promise<ResponseModel>;
  getById(id: string): Promise<ResponseModel>;
  addDoctor(doctor: DoctorModel): Promise<ResponseModel>;
  updateDoctor(doctor: DoctorModel): Promise<ResponseModel>;
}