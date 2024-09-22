import { DoctorModel } from "../../application/models/doctorModel";
import { Doctor } from "../../domain/entities/doctor";

export class DoctorMocks {
  static GetDoctorModel() {
    const model = new DoctorModel();
    model.id = '0';
    model.firstName = 'fulano';
    model.lastName = 'de tal';
    model.email = 'fulano.de.tal@gmail.com';
    model.phoneNumber = '99 99999-9999';
    model.speciality = 'ortopedista';
    return model;
  }

  static GetDoctorEntity() {
    const entity = new Doctor();
    entity.id = '0';
    entity.firstName = 'fulano';
    entity.lastName = 'de tal';
    entity.email = 'fulano.de.tal@gmail.com';
    entity.phoneNumber = '99 99999-9999';
    entity.speciality = 'ortopedista';
    return entity;
  }

  static GetUpdatedEntityDoctor() {
    const entity = new Doctor();
    entity.id = '0';
    entity.firstName = 'ciclano';
    entity.lastName = 'de tal';
    entity.email = 'ciclano.de.tal@gmail.com';
    entity.phoneNumber = '99 99999-9999';
    entity.speciality = 'pediatra';
    return entity;
  }

  static GetDoctorModelArray() {
    return [this.GetDoctorModel()]
  }

  static GetDoctorEntityArray() {
    return [this.GetDoctorEntity()]
  }
}