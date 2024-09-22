import { Router, Request, Response, NextFunction } from 'express';
import { injectable } from 'tsyringe';
import { DoctorController } from '../controllers/doctorController';
import { validateToken, validateRole } from 'medical-consultation-token';
import { MiddlewareUtils } from '../middlewares/middlewareUtils';

@injectable()
export class DoctorRouter {
  public router: Router = Router();

  constructor(private doctorController: DoctorController) {
    this.setRoutes();
  }

  private setRoutes(): void {
    this.router.get(
      '/api/v1/doctors/:doctorId',
      MiddlewareUtils.asyncMiddleware(validateToken),
      MiddlewareUtils.asyncMiddleware(validateRole('admin,system')),
      async (request: Request, response: Response) =>
        this.doctorController.getById(request, response)
    );

    this.router.get(
      '/api/v1/doctors/speciality/:speciality',
      MiddlewareUtils.asyncMiddleware(validateToken),
      MiddlewareUtils.asyncMiddleware(validateRole('admin,system')),
      async (request: Request, response: Response) =>
        this.doctorController.getBySpeciality(request, response)
    );

    this.router.post(
      '/api/v1/doctors',
      MiddlewareUtils.asyncMiddleware(validateToken),
      MiddlewareUtils.asyncMiddleware(validateRole('admin')),
      async (request: Request, response: Response) =>
        this.doctorController.addDoctor(request, response)
    );

    this.router.put(
      '/api/v1/doctors',
      MiddlewareUtils.asyncMiddleware(validateToken),
      MiddlewareUtils.asyncMiddleware(validateRole('admin')),
      async (request: Request, response: Response) =>
        this.doctorController.updateDoctor(request, response)
    );
  }
} 