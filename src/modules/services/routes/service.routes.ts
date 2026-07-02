import { Router } from "express";
import ServiceController from "../controllers/ServiceController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import { celebrate, Joi, Segments } from "celebrate";

const serviceRouter = Router();
const serviceController = new ServiceController();

serviceRouter.use(isAuthenticated);

serviceRouter.get('/', async(req, res, next) => {
    try {
        await serviceController.index(req, res, next);
    } catch(err) {
        next(err);
    }
})

serviceRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    async(req, res, next) => {
        try {
            await serviceController.show(req, res, next);
        } catch(err) {
            next(err);
        }
    }
)

serviceRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            client: Joi.string().required(),
            address: Joi.string().required(),
            type: Joi.string().required(),
            price: Joi.number().precision(2).min(0).required(),
            employee_in_charge_id: Joi.string().required()
        }
    }),
    async(req, res, next) => {
        try {
            await serviceController.create(req, res, next);
        } catch(err) {
            next(err);
        }
    }
)

serviceRouter.put(
    '/:id',
    celebrate({
        [Segments.BODY]: {
            client: Joi.string().required(),
            address: Joi.string().required(),
            type: Joi.string().required(),
            price: Joi.number().precision(2).min(0).required(),
            employee_in_charge_id: Joi.string().required()
        },
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    async(req, res, next) => {
        try {
            await serviceController.update(req, res, next);
        } catch(err) {
            next(err);
        }
    }
)

serviceRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    async(req, res, next) => {
        try {
            await serviceController.delete(req, res, next);
        } catch(err) {
            next(err);
        }
    }
)

export default serviceRouter;