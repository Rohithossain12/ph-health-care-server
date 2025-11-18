import express from 'express';
import { userRoutes } from '../modules/user/user.routes';

const userRouter = express.Router();

const moduleRoutes = [
  
    {
        path: '/user',
        route: userRoutes
    },
];

moduleRoutes.forEach(route => userRouter.use(route.path, route.route))

export default userRouter;