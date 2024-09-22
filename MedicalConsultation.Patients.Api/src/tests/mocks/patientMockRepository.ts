import { Patient } from "../../domain/entities/patient";
import { IPatientRepository } from "../../domain/interfaces/infra/repositories/patientRepository.interface";
import { PatientMocks } from "./patientMocks";

export class PatientMockRepository implements IPatientRepository {
  getReportData(patientDocuments: string[]): Promise<Patient[] | null> {
    throw new Error("Method not implemented.");
  }
  async getByDocument(document: string): Promise<Patient | null> {
    return await PatientMocks.GetPatientEntity();
  }
  async addPatient(patient: Patient): Promise<Patient | null> {
    return await PatientMocks.GetPatientEntity();
  }
  async updatePatient(patient: Patient): Promise<Patient | null> {
    return await PatientMocks.GetUpdatedEntityPatient();
  }
}