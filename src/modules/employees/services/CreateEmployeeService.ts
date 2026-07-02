import { AppDataSource } from "@shared/typeorm/data-source";
import Employee from "../typeorm/entities/Employee";
import AppError from "@shared/errors/AppError";

interface IRequest {
    name: string;
    cpf: string;
    role: string;
    phone: string;
    salary: number;
}

export default class CreateEmployeeService {
    public async execute({name, cpf, role, phone, salary}: IRequest): Promise<Employee>{
        const employeesRepository = AppDataSource.getRepository(Employee);

        const employeeExists = await employeesRepository.findOne({
            where: {cpf}
        });

        if(employeeExists) {
            throw new AppError("CPF already in use by an employee.");
        }

        const employee = employeesRepository.create({ name, cpf, role, phone, salary });
        await employeesRepository.save(employee);
        return employee;
    }
}