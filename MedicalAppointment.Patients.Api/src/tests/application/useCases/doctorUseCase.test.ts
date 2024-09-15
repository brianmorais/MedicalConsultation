import 'reflect-metadata'; 
import { ResponseModel } from '../../../application/models/responseModel';
import { LoggerMock } from '../../mocks/loggerMock';
import { PatientMocks } from '../../mocks/patientMocks';
import { PatientUseCase } from '../../../application/useCases/patientUseCase';
import { PatientMockRepository } from '../../mocks/patientMockRepository';
import { PatientDataMapping } from '../../../application/dataMappings/patientDataMapping';

describe('Patients use case tests', () => {
  test('should add new patient', async () => {
    const patientModel = PatientMocks.GetPatientModel();
    const expectedValue = new ResponseModel(patientModel);
    const useCase = new PatientUseCase(new PatientMockRepository(), new LoggerMock());

    const response = await useCase.addPatient(patientModel);

    expect(response).toEqual(expectedValue);
    expect(response).toStrictEqual(expectedValue);
    expect(response.notifications.length).toBe(0);
  });

  test('should update patient', async () => {
    const expectedValue = new ResponseModel(PatientDataMapping.FromEntityToModel(PatientMocks.GetUpdatedEntityPatient()));
    const patientModel = PatientMocks.GetPatientModel();
    const useCase = new PatientUseCase(new PatientMockRepository(), new LoggerMock());

    const response = await useCase.updatePatient(patientModel);

    expect(response).toEqual(expectedValue);
    expect(response).toStrictEqual(expectedValue);
    expect(response.notifications.length).toBe(0);
  });

  test('should get patient by document', async () => {
    const expectedValue = new ResponseModel(PatientMocks.GetPatientModel());
    const document = '12345678912';
    const useCase = new PatientUseCase(new PatientMockRepository(), new LoggerMock());

    const response = await useCase.getByDocument(document);

    expect(response).toEqual(expectedValue);
    expect(response).toStrictEqual(expectedValue);
    expect(response.notifications.length).toBe(0);
  });
});