import { Doctor } from "../../../entities/doctor";

export interface IDoctorRepository {
  getBySpeciality(speciality: string): Promise<Doctor[] | null>;
  getById(id: string): Promise<Doctor | null>;
  addDoctor(doctor: Doctor): Promise<Doctor | null>;
  updateDoctor(doctor: Doctor): Promise<Doctor | null>;
}