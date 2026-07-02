import { AppDataSource } from "@shared/typeorm/data-source";
import Service from "../typeorm/entities/Service";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string;
}

export default class ShowServiceService {
    public async execute({ id }: IRequest): Promise<Service> {
        const servicesRepository = AppDataSource.getRepository(Service);

        const service = await servicesRepository.findOne({
            where: { id },
            relations: {
                employeeInCharge: true
            }
        });

        if(!service) {
            throw new AppError("Service not found.");
        }
        
        return service;
    }
}