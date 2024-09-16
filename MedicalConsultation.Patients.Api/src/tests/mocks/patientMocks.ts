import { PatientModel } from "../../application/models/patientModel";
import { Patient } from "../../domain/entities/patient";

export class PatientMocks {
  static GetPatientModel() {
    const model = new PatientModel();
    model.id = '0';
    model.firstName = 'fulano';
    model.lastName = 'de tal';
    model.email = 'fulano.de.tal@gmail.com';
    model.phoneNumber = '99 99999-9999';
    model.document = '12345678912';
    return model;
  }

  static GetPatientEntity() {
    const entity = new Patient();
    entity.id = '0';
    entity.firstName = 'fulano';
    entity.lastName = 'de tal';
    entity.email = 'fulano.de.tal@gmail.com';
    entity.phoneNumber = '99 99999-9999';
    entity.document = '12345678912';
    return entity;
  }

  static GetUpdatedEntityPatient() {
    const entity = new Patient();
    entity.id = '0';
    entity.firstName = 'ciclano';
    entity.lastName = 'de tal';
    entity.email = 'ciclano.de.tal@gmail.com';
    entity.phoneNumber = '99 99999-9999';
    entity.document = '12345678912';
    return entity;
  }
}