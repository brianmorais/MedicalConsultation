import { Patient } from "../../domain/entities/patient";
import { PatientModel } from "../models/patientModel";

export class PatientDataMapping {
  static FromEntityToModel(entity: Patient): PatientModel {
    const model = new PatientModel();
    model.id = entity.id;
    model.firstName = entity.firstName;
    model.lastName = entity.lastName;
    model.email = entity.email;
    model.phoneNumber = entity.phoneNumber;
    model.document = entity.document;
    return model;
  }

  static FromModelToEntity(model: PatientModel): Patient {
    const entity = new Patient();
    entity.id = model.id;
    entity.firstName = model.firstName;model
    entity.lastName = model.lastName;
    entity.email = model.email;
    entity.phoneNumber = model.phoneNumber;
    entity.document = model.document;
    return entity;
  }
}