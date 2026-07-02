import Employee from "@modules/employees/typeorm/entities/Employee";
import Service from "@modules/services/typeorm/entities/Service";
import User from "@modules/users/typeorm/entities/User";
import UserToken from "@modules/users/typeorm/entities/UserToken";
import path from "path";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "docker",
    database: "apidedetiza",
    synchronize: false,
    logging: true,
    entities: [Employee, User, UserToken, Service],
    migrations: [path.join("src", "shared", "typeorm", "migrations", "*.ts")]
})