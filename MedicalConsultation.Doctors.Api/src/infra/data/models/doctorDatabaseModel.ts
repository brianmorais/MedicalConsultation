import { model, Schema, Types } from "mongoose";

export interface IDoctor {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  speciality: string;
}

const doctorSchema = new Schema<IDoctor>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  speciality: { type: String, required: true }
});

export const DoctorDatabaseModel = model<IDoctor>('Doctor', doctorSchema);