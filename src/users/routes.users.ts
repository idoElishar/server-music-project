import express from 'express';
import  usersController  from './controller.users';

const usersRouter = express.Router();

usersRouter.post('/register', usersController.registerUser);
usersRouter.post('/login', usersController.loginUser);


export default usersRouter;

