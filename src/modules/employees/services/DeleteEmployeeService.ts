import { AppDataSource } from "@shared/typeorm/data-source";
import Employee from "../typeorm/entities/Employee";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string;
}

export default class DeleteEmployeeService {
    public async execute({ id }: IRequest): Promise<void> {
        const employeesRepository = AppDataSource.getRepository(Employee);

        const employee = await employeesRepository.findOneBy({ id });
        if(!employee) {
            throw new AppError("Employee not found.");
        }

        await employeesRepository.remove(employee);
    }
}