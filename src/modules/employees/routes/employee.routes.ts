import { Router } from "express";
import EmployeeController from "../controllers/EmployeeController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import { celebrate, Joi, Segments } from "celebrate";

const employeeRouter = Router();
const employeeController = new EmployeeController();

employeeRouter.use(isAuthenticated);

employeeRouter.get('/', async(req, res, next) => {
    try {
        await employeeController.index(req, res, next);
    } catch(err) {
        next(err);
    }
})

employeeRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    async(req, res, next) => {
        try {
            await employeeController.show(req, res, next);
        } catch(err) {
            next(err);
        }
    }
)

employeeRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            cpf: Joi.string().required(),
            role: Joi.string().required(),
            phone: Joi.string().required(),
            salary: Joi.number().precision(2).min(0).required()
        }
    }),
    async(req, res, next) => {
        try {
            await employeeController.create(req, res, next);
        } catch(err) {
            next(err);
        }
    }
)

employeeRouter.put(
    '/:id',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            cpf: Joi.string().required(),
            role: Joi.string().required(),
            phone: Joi.string().required(),
            salary: Joi.number().precision(2).min(0).required()
        },
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    async(req, res, next) => {
        try {
            await employeeController.update(req, res, next);
        } catch(err) {
            next(err);
        }
    }
)

employeeRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    async(req, res, next) => {
        try {
            await employeeController.delete(req, res, next);
        } catch(err) {
            next(err);
        }
    }
)

export default employeeRouter;