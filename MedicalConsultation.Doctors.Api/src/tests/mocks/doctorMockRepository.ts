import { Doctor } from "../../domain/entities/doctor";
import { IDoctorRepository } from "../../domain/interfaces/infra/repositories/doctorRepository.interface";
import { DoctorMocks } from "./doctorMocks";

export class DoctorMockRepository implements IDoctorRepository {
  async getBySpeciality(speciality: string): Promise<Doctor> {
    return await DoctorMocks.GetDoctorEntity();
  }
  async getById(id: string): Promise<Doctor> {
    return await DoctorMocks.GetDoctorEntity();
  }
  async addDoctor(doctor: Doctor): Promise<Doctor> {
    return await DoctorMocks.GetDoctorEntity();
  }
  async updateDoctor(doctor: Doctor): Promise<Doctor> {
    return await DoctorMocks.GetUpdatedEntityDoctor();
  }
}