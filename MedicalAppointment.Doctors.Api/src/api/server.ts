import express, { Application, json, urlencoded } from 'express';
import { injectable } from 'tsyringe';
import { Routes } from './routes';

@injectable()
export class Server {
	public app: Application = express();

	constructor(private routes: Routes) {
		this.routes = routes;
		this.setMiddlewares();
		this.setRoutes();
	}

	private setMiddlewares(): void {
		this.app.use(json());
		this.app.use(urlencoded({ extended: false }));
	}

	private setRoutes(): void {
		this.app.use(this.routes.router);
	}
}