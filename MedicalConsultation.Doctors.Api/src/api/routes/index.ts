import { Router } from 'express';
import { injectable } from 'tsyringe';
import { DoctorRouter } from './doctorRouter';

@injectable()
export class Routes {
  public router: Router = Router();

  constructor(private doctorRouter: DoctorRouter) {
    this.setRoutes();
  }

  private setRoutes(): void {
    this.router.use(this.doctorRouter.router);
  }
}