import { inject, injectable } from "tsyringe";
import { Doctor } from "../../../domain/entities/doctor";
import { IDoctorRepository } from "../../../domain/interfaces/infra/repositories/doctorRepository.interface";
import { DatabaseConnection } from "../databaseConnetion";
import { DoctorDatabaseModel } from "../models/doctorDatabaseModel";

@injectable()
export class DoctorRepository implements IDoctorRepository {
  constructor(@inject("DatabaseConnection") private databaseConnection: DatabaseConnection) { }

  async updateDoctor(doctor: Doctor): Promise<Doctor | null> {
    this.databaseConnection.Connect();
    const doctorDatabase = await DoctorDatabaseModel.findById(doctor.id);
    if (doctorDatabase) {
      doctorDatabase.firstName = doctor.firstName;
      doctorDatabase.lastName = doctor.lastName;
      doctorDatabase.email = doctor.email;
      doctorDatabase.phoneNumber = doctor.phoneNumber;
      doctorDatabase.speciality = doctor.speciality;
      await doctorDatabase.save();
      return doctor;
    }
    return null;
  }

  async addDoctor(doctor: Doctor): Promise<Doctor | null> {
    this.databaseConnection.Connect();
    const model = new DoctorDatabaseModel({
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      email: doctor.email,
      speciality: doctor.speciality,
      phoneNumber: doctor.phoneNumber
    });
    await model.save();
    doctor.id = model._id.toString();
    return doctor;
  }

  async getBySpeciality(speciality: string): Promise<Doctor[] | null> {
    this.databaseConnection.Connect();
    const models = await DoctorDatabaseModel.find({ speciality: { $in: speciality } });
    if (models) {
      return models.map(d => {
        const doctor = new Doctor();
        doctor.id = d.id,
        doctor.firstName = d.firstName,
        doctor.lastName = d.lastName,
        doctor.email = d.email,
        doctor.phoneNumber = d.phoneNumber,
        doctor.speciality = d.speciality
        return doctor;
      });
    }
    return null;
  }

  async getById(id: string): Promise<Doctor | null> {
    this.databaseConnection.Connect();
    const model = await DoctorDatabaseModel.findOne({ _id: id });
    if (model) {
      const doctor = new Doctor();
      doctor.id = model._id.toString();
      doctor.firstName = model.firstName;
      doctor.lastName = model.lastName;
      doctor.email = model.email;
      doctor.phoneNumber = model.phoneNumber;
      doctor.speciality = model.speciality;
      return doctor;
    }
    return null;
  }
}