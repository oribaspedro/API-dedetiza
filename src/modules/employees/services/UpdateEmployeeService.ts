import { AppDataSource } from "@shared/typeorm/data-source";
import Employee from "../typeorm/entities/Employee";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string;
    name: string;
    cpf: string;
    role: string;
    phone: string;
    salary: number;
}

export default class UpdateEmployeeService {
    public async execute({ id, name, cpf, role, phone, salary }: IRequest): Promise<Employee> {
        const employeesRepository = AppDataSource.getRepository(Employee);

        const employee = await employeesRepository.findOneBy({ id });

        if(!employee) {
            throw new AppError('Employee not found');
        }

        const employeeExists = await employeesRepository.findOne({
            where: { cpf }
        });

        if(employeeExists && employeeExists.id !== employee.id) {
            throw new AppError('This CPF is already in use.');
        }

        employee.name = name;
        employee.cpf = cpf;
        employee.role = role;
        employee.phone = phone;
        employee.salary = salary;

        await employeesRepository.save(employee);
        return employee;
    }
}