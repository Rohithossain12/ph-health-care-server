import express from 'express';

import { authRoutes } from '../modules/auth/auth.routes';
import { userRoutes } from '../modules/user/user.routes';

const userRouter = express.Router();

const moduleRoutes = [
  
    {
        path: '/user',
        route: userRoutes
    },
    {
        path: '/auth',
        route: authRoutes
    },
];

moduleRoutes.forEach(route => userRouter.use(route.path, route.route))

export default userRouter;