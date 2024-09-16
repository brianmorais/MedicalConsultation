import { Router, Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { DoctorController } from '../controllers/doctorController';
import { validateToken, validateRole } from 'tokenvalidator';

@injectable()
export class DoctorRouter {
  public router: Router = Router();

  constructor(private doctorController: DoctorController) {
    this.setRoutes();
  }

  private setRoutes(): void {
    this.router.get(
      '/api/v1/doctors/:doctorId', 
      validateToken, 
      validateRole('admin,doctor,patient'), 
      async (request: Request, response: Response) => 
        this.doctorController.getById(request, response)
    );

    this.router.get(
      '/api/v1/doctors/speciality/:speciality', 
      validateToken, 
      validateRole('admin,doctor,patient'), 
      async (request: Request, response: Response) => 
        this.doctorController.getBySpeciality(request, response)
    );

    this.router.post(
      '/api/v1/doctors', 
      validateToken, 
      validateRole('admin'), 
      async (request: Request, response: Response) => 
        this.doctorController.addDoctor(request, response)
    );

    this.router.put(
      '/api/v1/doctors', 
      validateToken, 
      validateRole('admin'), 
      async (request: Request, response: Response) => 
        this.doctorController.updateDoctor(request, response)
    );
  }
} 