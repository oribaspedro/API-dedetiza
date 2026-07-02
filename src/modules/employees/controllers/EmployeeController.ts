import { NextFunction, Request, Response } from "express";
import ListEmployeeService from "../services/ListEmployeeService";
import ShowEmployeeService from "../services/ShowEmployeeService";
import UpdateEmployeeService from "../services/UpdateEmployeeService";
import CreateEmployeeService from "../services/CreateEmployeeService";
import DeleteEmployeeService from "../services/DeleteEmployeeService";

export default class EmployeeController {
    public async index(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const listEmployees = new ListEmployeeService();
            const employees = await listEmployees.execute();
            return res.json(employees);
        } catch(err) {
            next(err);
            return res;
        }
    } 

    public async show(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const id = req.params.id as string;
            const showEmployee = new ShowEmployeeService();
            const employee = await showEmployee.execute({ id });
            return res.json(employee);
        } catch(err) {
            next(err);
            return res;
        }
    }

    public async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { name, cpf, role, phone, salary } = req.body;
            const createEmployee = new CreateEmployeeService();
            const employee = await createEmployee.execute({ name, cpf, role, phone, salary });
            return res.json(employee);
        } catch(err) {
            next(err);
            return res;
        }
    }

    public async update(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { name, cpf, role, phone, salary } = req.body;
            const id = req.params.id as string;
            const updateEmployee = new UpdateEmployeeService();
            const employee = await updateEmployee.execute({ id, name, cpf, role, phone, salary });
            return res.json(employee);
        } catch(err) {
            next(err);
            return res;
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const id = req.params.id as string;
            const deleteEmployee = new DeleteEmployeeService();
            await deleteEmployee.execute({ id });
            return res.status(204).send();
        } catch(err) {
            next(err);
            return res;
        }
    }
}