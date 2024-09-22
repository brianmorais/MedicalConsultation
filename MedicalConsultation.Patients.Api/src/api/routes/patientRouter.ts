import { Router, Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { PatientController } from '../controllers/patientController';
import { validateRole, validateToken } from 'medical-consultation-token';
import { MiddlewareUtils } from '../middlewares/middlewareUtils';

@injectable()
export class PatientRouter {
  public router: Router = Router();

  constructor(private patientController: PatientController) {
    this.setRoutes();
  }

  private setRoutes(): void {
    this.router.get(
      '/api/v1/patients/:document', 
      MiddlewareUtils.asyncMiddleware(validateToken), 
      MiddlewareUtils.asyncMiddleware(validateRole('admin,system')), 
      async (request: Request, response: Response) => 
        this.patientController.getByDocument(request, response)
    );

    this.router.put(
      '/api/v1/patients', 
      MiddlewareUtils.asyncMiddleware(validateToken), 
      MiddlewareUtils.asyncMiddleware(validateRole('admin')), 
      async (request: Request, response: Response) => 
        this.patientController.updatePatient(request, response)
    );

    this.router.post(
      '/api/v1/patients', 
      MiddlewareUtils.asyncMiddleware(validateToken), 
      MiddlewareUtils.asyncMiddleware(validateRole('admin')), 
      async (request: Request, response: Response) => 
        this.patientController.addPatient(request, response)
    );

    this.router.post(
      '/api/v1/patients/get-report', 
      MiddlewareUtils.asyncMiddleware(validateToken), 
      MiddlewareUtils.asyncMiddleware(validateRole('admin,system')), 
      async (request: Request, response: Response) => 
        this.patientController.getReportData(request, response)
    );
  }
} 