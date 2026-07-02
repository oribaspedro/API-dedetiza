import { NextFunction, Request, Response } from "express";
import ListServiceService from "../services/ListServiceService";
import ShowServiceService from "../services/ShowServiceService";
import CreateServiceService from "../services/CreateServiceService";
import UpdateServiceService from "../services/UpdateServiceService";
import DeleteServiceService from "../services/DeleteServiceService";

export default class ServiceController {
    public async index(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const listServices = new ListServiceService();
            const services = await listServices.execute();
            return res.json(services);
        } catch(err) {
            next(err);
            return res;
        }
    } 

    public async show(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const id = req.params.id as string;
            const showService = new ShowServiceService();
            const service = await showService.execute({ id });
            return res.json(service);
        } catch(err) {
            next(err);
            return res;
        }
    }

    public async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { client, address, type, price, employee_in_charge_id } = req.body;
            const createService = new CreateServiceService();
            const service = await createService.execute({ client, address, type, price, employee_in_charge_id });
            return res.json(service);
        } catch(err) {
            next(err);
            return res;
        }
    }

    public async update(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { client, address, type, price, employee_in_charge_id } = req.body;
            const id = req.params.id as string;
            const updateService = new UpdateServiceService();
            const service = await updateService.execute({ id, client, address, type, price, employee_in_charge_id });
            return res.json(service);
        } catch(err) {
            next(err);
            return res;
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const id = req.params.id as string;
            const deleteService = new DeleteServiceService();
            await deleteService.execute({ id });
            return res.status(204).send();
        } catch(err) {
            next(err);
            return res;
        }
    }
}