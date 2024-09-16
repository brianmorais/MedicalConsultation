import { Router, Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { AuthController } from '../controllers/authController';

@injectable()
export class AuthRouter {
  public router: Router = Router();

  constructor(private authController: AuthController) {
    this.setRoutes();
  }

  private setRoutes(): void {
    this.router.post(
      '/api/v1/auth', 
      async (request: Request, response: Response) => 
        this.authController.login(request, response)
    );

    this.router.post(
      '/api/v1/auth/validate', 
      async (request: Request, response: Response) => 
        this.authController.validate(request, response)
    );
  }
}