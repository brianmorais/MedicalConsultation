import { Patient } from "../../domain/entities/patient";
import { IPatientRepository } from "../../domain/interfaces/infra/repositories/patientRepository.interface";
import { PatientMocks } from "./patientMocks";

export class PatientMockRepository implements IPatientRepository {
  async getByDocument(document: string): Promise<Patient> {
    return await PatientMocks.GetPatientEntity();
  }
  async addPatient(patient: Patient): Promise<Patient> {
    return await PatientMocks.GetPatientEntity();
  }
  async updatePatient(patient: Patient): Promise<Patient> {
    return await PatientMocks.GetUpdatedEntityPatient();
  }
}