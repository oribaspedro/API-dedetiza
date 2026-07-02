import { AppDataSource } from "@shared/typeorm/data-source";
import Service from "../typeorm/entities/Service";
import AppError from "@shared/errors/AppError";
import Employee from "@modules/employees/typeorm/entities/Employee";

interface IRequest {
    id: string;
    client: string;
    address: string;
    type: string;
    price: number;
    employee_in_charge_id: string;
}

export default class UpdateServiceService {
    public async execute({ id, client, address, type, price, employee_in_charge_id }: IRequest): Promise<Service> {
        const servicesRepository = AppDataSource.getRepository(Service);
        const employeesRepository = AppDataSource.getRepository(Employee);

        const service = await servicesRepository.findOne({ where: { id } });
        if(!service) {
            throw new AppError("Service not found.");
        }

        const employee = await employeesRepository.findOne({ where: { id: employee_in_charge_id } });
        if(!employee) {
            throw new AppError("Could not find the specified employee.");
        }

        service.client = client;
        service.address = address;
        service.type = type;
        service.price = price;
        service.employeeInCharge = employee;
        
        await servicesRepository.save(service);

        return service;
    }
}