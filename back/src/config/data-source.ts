import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Turn } from "../entities/Turn";
import { Credential } from "../entities/Credential";
import { DB_TYPE, DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } from "./envs";

export const AppDataSource = new DataSource({

    type: DB_TYPE as any,
    host: DB_HOST,
    port: DB_PORT as any,
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    //dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [User, Turn, Credential],
    subscribers: [],
    migrations: [],

})

export const UserModel = AppDataSource.getRepository(User);
export const TurnModel = AppDataSource.getRepository(Turn);
export const CredentialModel = AppDataSource.getRepository(Credential);
