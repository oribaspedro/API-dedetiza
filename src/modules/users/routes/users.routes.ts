import { Router } from "express";
import UsersController from "../controllers/UsersController";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";

const usersRouter = Router();
const controller = new UsersController();

usersRouter.get('/', isAuthenticated, async (req, res, next) => {
    try {
        await controller.index(req, res, next);
    } catch(err) {
        next(err);
    }
});

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }
    }),
    async (req, res, next) => {
        try {
            await controller.create(req, res, next);
        } catch(err) {
            next(err);
        }
    }
);

export default usersRouter;