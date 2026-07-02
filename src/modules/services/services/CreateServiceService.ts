import { AppDataSource } from "@shared/typeorm/data-source";
import Service from "../typeorm/entities/Service";
import Employee from "@modules/employees/typeorm/entities/Employee";
import AppError from "@shared/errors/AppError";

interface IRequest {
    client: string;
    address: string;
    type: string;
    price: number;
    employee_in_charge_id: string;
}

export default class CreateServiceService {
    public async execute({ client, address, type, price, employee_in_charge_id }: IRequest): Promise<Service> {
        const servicesRepository = AppDataSource.getRepository(Service);
        const employeesRepository = AppDataSource.getRepository(Employee);

        const employee = await employeesRepository.findOne({ where: { id: employee_in_charge_id } });
        if(!employee) {
            throw new AppError("The specified employee does not exist.");
        }
        
        const service = servicesRepository.create({ client, address, type, price, employeeInCharge: employee });
        await servicesRepository.save(service);
        return service;
    }
}