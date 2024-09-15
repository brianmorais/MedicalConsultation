import { Router, Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { PatientController } from '../controllers/patientController';
import { validateRole, validateToken } from 'tokenvalidator';

@injectable()
export class PatientRouter {
  public router: Router = Router();

  constructor(private patientController: PatientController) {
    this.setRoutes();
  }

  private setRoutes(): void {
    this.router.get(
      '/api/v1/patients/:document', 
      validateToken, 
      validateRole('admin,doctor,patient'), 
      async (request: Request, response: Response) => 
        this.patientController.getByDocument(request, response)
    );

    this.router.put(
      '/api/v1/patients', 
      validateToken, 
      validateRole('admin,doctor,patient'), 
      async (request: Request, response: Response) => 
        this.patientController.updatePatient(request, response)
    );

    this.router.post(
      '/api/v1/patients', 
      validateToken, 
      validateRole('admin,doctor'), 
      async (request: Request, response: Response) => 
        this.patientController.addPatient(request, response)
    );
  }
} 