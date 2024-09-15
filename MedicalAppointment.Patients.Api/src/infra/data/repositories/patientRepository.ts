import { inject, injectable } from "tsyringe";
import { Patient } from "../../../domain/entities/patient";
import { IPatientRepository } from "../../../domain/interfaces/infra/repositories/patientRepository.interface";
import { DatabaseConnection } from "../databaseConnetion";
import { PatientDatabaseModel } from "../models/patientDatabaseModel";

@injectable()
export class PatientRepository implements IPatientRepository {
  constructor(@inject("DatabaseConnection") private databaseConnection: DatabaseConnection) { }

  async updatePatient(patient: Patient): Promise<Patient | null> {
    try {
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
    } catch {
      return null;
    }
  }

  async addPatient(patient: Patient): Promise<Patient | null> {
    try {
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
    } catch (error) {
      return null;
    }
  }

  async getByDocument(document: string): Promise<Patient | null> {
    try {
      this.databaseConnection.Connect();
      const model = await PatientDatabaseModel.findOne({ document });
      if (model) {
        const patient = new Patient();
        patient.id = model._id.toString();
        patient.firstName = model.firstName;
        patient.lastName = model.lastName;
        patient.email = model.email;
        patient.phoneNumber = model.phoneNumber;
        patient.document = model.document;
        return patient;
      }
      return null;
    } catch {
      return null;
    }
  }
}