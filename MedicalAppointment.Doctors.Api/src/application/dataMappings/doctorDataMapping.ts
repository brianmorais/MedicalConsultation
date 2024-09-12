import { Doctor } from "../../domain/entities/doctor";
import { DoctorModel } from "../models/doctorModel";

export class DoctorDataMapping {
  static FromEntityToModel(entity: Doctor): DoctorModel {
    const model = new DoctorModel();
    model.id = entity.id;
    model.firstName = entity.firstName;
    model.lastName = entity.lastName;
    model.email = entity.email;
    model.phoneNumber = entity.phoneNumber;
    model.speciality = entity.speciality;
    return model;
  }

  static FromModelToEntity(model: DoctorModel): Doctor {
    const entity = new Doctor();
    entity.id = model.id;
    entity.firstName = model.firstName;model
    entity.lastName = model.lastName;
    entity.email = model.email;
    entity.phoneNumber = model.phoneNumber;
    entity.speciality = model.speciality;
    return entity;
  }
}