import { Router, Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { DoctorController } from '../controllers/doctorController';
import { validateToken } from 'tokenvalidator';

@injectable()
export class DoctorRouter {
  public router: Router = Router();

  constructor(private doctorController: DoctorController) {
    this.setRoutes();
  }

  private setRoutes(): void {
    this.router.get('/api/v1/doctors/:doctorId', validateToken, async (request: Request, response: Response) => this.doctorController.getById(request, response));
    this.router.get('/api/v1/doctors/speciality/:speciality', validateToken, async (request: Request, response: Response) => this.doctorController.getBySpeciality(request, response));
    this.router.post('/api/v1/doctors', validateToken, async (request: Request, response: Response) => this.doctorController.addDoctor(request, response));
    this.router.put('/api/v1/doctors', validateToken, async (request: Request, response: Response) => this.doctorController.updateDoctor(request, response));
  }
}