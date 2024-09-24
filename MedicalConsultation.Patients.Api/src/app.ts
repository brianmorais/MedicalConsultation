import 'reflect-metadata';
import * as dotenv from 'dotenv';
import os from 'os';
import { container, Setup } from './ioc/setup';
import { Server } from './api/server';

dotenv.config();

Setup.configure();
const server = container.resolve(Server);

const port = process.env.PORT || 3000;
server.app.listen(port, () => console.log(`Server On: ${os.hostname()}:${process.env.PORT}`));