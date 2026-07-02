import { AppDataSource } from "@shared/typeorm/data-source";
import Employee from "../typeorm/entities/Employee";

export default class ListEmployeeService {
    public async execute(): Promise<Employee[]> {
        const employeesRepository = AppDataSource.getRepository(Employee);

        const employees = await employeesRepository.find();
        
        return employees;
    }
}