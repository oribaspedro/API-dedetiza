import { AppDataSource } from "@shared/typeorm/data-source";
import Service from "../typeorm/entities/Service";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string;
}

export default class DeleteServiceService {
    public async execute({ id }: IRequest): Promise<void> {
        const servicesRepository = AppDataSource.getRepository(Service);

        const service = await servicesRepository.findOne({ where: { id } });

        if(!service) {
            throw new AppError("Service not found.");
        }

        await servicesRepository.remove(service);
    }
}