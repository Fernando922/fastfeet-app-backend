import express from 'express';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  // não é público
  middlewares() {
    this.server.use(express.json());
  }

  // não é público
  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
