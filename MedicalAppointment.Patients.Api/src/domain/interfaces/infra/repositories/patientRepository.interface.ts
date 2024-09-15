import { Patient } from "../../../entities/patient";

export interface IPatientRepository {
  addPatient(patient: Patient): Promise<Patient | null>;
  updatePatient(patient: Patient): Promise<Patient | null>;
  getByDocument(document: string): Promise<Patient | null>;
}