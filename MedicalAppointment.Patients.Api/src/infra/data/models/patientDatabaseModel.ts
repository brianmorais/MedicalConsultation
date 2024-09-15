import { model, Schema, Types } from "mongoose";

export interface IPatient {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  document: string;
}

const patientSchema = new Schema<IPatient>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  document: { type: String, required: true }
});

export const PatientDatabaseModel = model<IPatient>('Patient', patientSchema);