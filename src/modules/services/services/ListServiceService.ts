import { AppDataSource } from "@shared/typeorm/data-source";
import Service from "../typeorm/entities/Service";

export default class ListServiceService {
    public async execute(): Promise<Service[]> {
        const servicesRepository = AppDataSource.getRepository(Service);
        return await servicesRepository.find({ 
            relations: {
                employeeInCharge: true
            }
        });
    }
}