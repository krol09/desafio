import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionControllers from './app/controllers/SessionControllers';
import authMiddleware from './app/middlewares/auth';
import FileController from './app/controllers/FileController';
import CollaboratorController from './app/controllers/CollaboratorController';
import AppointmentController from './app/controllers/AppointmentController';

const routes = new Router();
const upload = multer();

routes.post('/users', UserController.store)
routes.post('/session', SessionController.store)

//Rotas autenticadas
routes.use(authMiddleware)
routes.put('/users', UserController.update)

//Rota de agendamento
routes.post('/appointment', AppointmentController.store)

//Listagem de agendamento
routes.get('/appointment', AppointmentController.index)

//Lista todos os colaboradores
routes.get('/collaborator', CollaboratorController.index)

//Listagem de agendamento
routes.get('/schedule', ScheduleController.index)

//Carregamento de arquivos
routes.post('/files', upload.single('file'), FileController.store);

export default routes;