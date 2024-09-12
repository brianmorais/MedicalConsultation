import { Router } from 'express';
import { injectable } from 'tsyringe';
import { AuthRouter } from './authRouter';

@injectable()
export class Routes {
  public router: Router = Router();

  constructor(private authRouter: AuthRouter) {
    this.setRoutes();
  }

  private setRoutes(): void {
    this.router.use(this.authRouter.router);
  }
}