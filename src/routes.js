import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.use(authMiddleware);
routes.post('/recipients', RecipientController.store);
routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.show);
routes.delete('/recipients/:id', RecipientController.delete);
routes.put('/recipients', RecipientController.update);

export default routes;
