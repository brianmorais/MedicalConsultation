import 'reflect-metadata'; 
import { DoctorUseCase } from "../../../application/useCases/doctorUseCase";
import { DoctorMocks } from "../../mocks/doctorMocks";
import { DoctorMockRepository } from "../../mocks/doctorMockRepository";
import { DoctorDataMapping } from '../../../application/dataMappings/doctorDataMapping';
import { ResponseModel } from '../../../application/models/responseModel';
import { LoggerMock } from '../../mocks/loggerMock';

describe('Doctors use case tests', () => {
  test('should add new doctor', async () => {
    const doctorModel = DoctorMocks.GetDoctorModel();
    const expectedValue = new ResponseModel(doctorModel);
    const useCase = new DoctorUseCase(new DoctorMockRepository(), new LoggerMock());

    const response = await useCase.addDoctor(doctorModel);

    expect(response).toEqual(expectedValue);
    expect(response).toStrictEqual(expectedValue);
    expect(response.notifications.length).toBe(0);
  });

  test('should update doctor', async () => {
    const expectedValue = new ResponseModel(DoctorDataMapping.FromEntityToModel(DoctorMocks.GetUpdatedEntityDoctor()));
    const doctorModel = DoctorMocks.GetDoctorModel();
    const useCase = new DoctorUseCase(new DoctorMockRepository(), new LoggerMock());

    const response = await useCase.updateDoctor(doctorModel);

    expect(response).toEqual(expectedValue);
    expect(response).toStrictEqual(expectedValue);
    expect(response.notifications.length).toBe(0);
  });

  test('should get doctor by id', async () => {
    const expectedValue = new ResponseModel(DoctorMocks.GetDoctorModel());
    const doctorId = '0';
    const useCase = new DoctorUseCase(new DoctorMockRepository(), new LoggerMock());

    const response = await useCase.getById(doctorId);

    expect(response).toEqual(expectedValue);
    expect(response).toStrictEqual(expectedValue);
    expect(response.notifications.length).toBe(0);
  });

  test('should get doctor by speciality', async () => {
    const expectedValue = new ResponseModel(DoctorMocks.GetDoctorModelArray());
    const speciality = 'ortopedista';
    const useCase = new DoctorUseCase(new DoctorMockRepository(), new LoggerMock());

    const response = await useCase.getBySpeciality(speciality);

    expect(response).toEqual(expectedValue);
    expect(response).toStrictEqual(expectedValue);
    expect(response.notifications.length).toBe(0);
  });
});