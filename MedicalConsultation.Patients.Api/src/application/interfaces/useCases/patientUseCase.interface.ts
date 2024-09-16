import { Patient } from "../../../domain/entities/patient";
import { ResponseModel } from "../../models/responseModel";

export interface IPatientUseCase {
  addPatient(patient: Patient): Promise<ResponseModel>;
  updatePatient(patient: Patient): Promise<ResponseModel>;
  getByDocument(document: string): Promise<ResponseModel>;
  getReportData(patientDocuments: string[]): Promise<ResponseModel>;
}