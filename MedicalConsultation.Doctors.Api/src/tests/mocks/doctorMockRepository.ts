import { Doctor } from "../../domain/entities/doctor";
import { IDoctorRepository } from "../../domain/interfaces/infra/repositories/doctorRepository.interface";
import { DoctorMocks } from "./doctorMocks";
import {  } from 'tsyringe';

export class DoctorMockRepository implements IDoctorRepository {
  async getBySpeciality(speciality: string): Promise<Doctor[] | null> {
    return await DoctorMocks.GetDoctorEntityArray();
  }
  async getById(id: string): Promise<Doctor | null> {
    return await DoctorMocks.GetDoctorEntity();
  }
  async addDoctor(doctor: Doctor): Promise<Doctor | null> {
    return await DoctorMocks.GetDoctorEntity();
  }
  async updateDoctor(doctor: Doctor): Promise<Doctor | null> {
    return await DoctorMocks.GetUpdatedEntityDoctor();
  }
}