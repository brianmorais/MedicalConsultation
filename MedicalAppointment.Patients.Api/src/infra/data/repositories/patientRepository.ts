import { inject, injectable } from "tsyringe";
import { Patient } from "../../../domain/entities/patient";
import { IPatientRepository } from "../../../domain/interfaces/infra/repositories/patientRepository.interface";
import { DatabaseConnection } from "../databaseConnetion";
import { IPatient, PatientDatabaseModel } from "../models/patientDatabaseModel";
import { Document } from "mongoose";

@injectable()
export class PatientRepository implements IPatientRepository {
  constructor(@inject("DatabaseConnection") private databaseConnection: DatabaseConnection) { }

  async updatePatient(patient: Patient): Promise<Patient | null> {
    this.databaseConnection.Connect();
    const patientDatabase = await PatientDatabaseModel.findById(patient.id);
    if (patientDatabase) {
      patientDatabase.firstName = patient.firstName;
      patientDatabase.lastName = patient.lastName;
      patientDatabase.email = patient.email;
      patientDatabase.phoneNumber = patient.phoneNumber;
      patientDatabase.document = patient.document;
      await patientDatabase.save();
      return patient;
    }
    return null;
  }

  async addPatient(patient: Patient): Promise<Patient | null> {
    this.databaseConnection.Connect();
    const model = new PatientDatabaseModel({
      firstName: patient.firstName,
      lastName: patient.lastName,
      email: patient.email,
      phoneNumber: patient.phoneNumber,
      document: patient.document
    });
    await model.save();
    patient.id = model._id.toString();
    return patient;
  }

  async getByDocument(document: string): Promise<Patient | null> {
    this.databaseConnection.Connect();
    const model = await PatientDatabaseModel.findOne({ document });
    if (model) {
      return this.databaseToEntityPatient(model);
    }
    return null;
  }

  async getReportData(patientDocuments: string[]): Promise<Patient[] | null> {
    this.databaseConnection.Connect();
    const models = await PatientDatabaseModel.find({ document: { $in: patientDocuments } });
    if (models) {
      return models.map(p => this.databaseToEntityPatient(p));
    }
    return null;
  }

  private databaseToEntityPatient(model: Document<unknown, {}, IPatient> & IPatient): Patient {
    const patient = new Patient();
    patient.id = model._id.toString();
    patient.firstName = model.firstName;
    patient.lastName = model.lastName;
    patient.email = model.email;
    patient.phoneNumber = model.phoneNumber;
    patient.document = model.document;
    return patient;
  }
}