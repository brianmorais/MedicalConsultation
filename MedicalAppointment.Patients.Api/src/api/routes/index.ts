import { Router } from 'express';
import { injectable } from 'tsyringe';
import { PatientRouter } from './patientRouter';

@injectable()
export class Routes {
  public router: Router = Router();

  constructor(private patientRouter: PatientRouter) {
    this.setRoutes();
  }

  private setRoutes(): void {
    this.router.use(this.patientRouter.router);
  }
}