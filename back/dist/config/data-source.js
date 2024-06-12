"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialModel = exports.TurnModel = exports.UserModel = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const Turn_1 = require("../entities/Turn");
const Credential_1 = require("../entities/Credential");
const envs_1 = require("./envs");
exports.AppDataSource = new typeorm_1.DataSource({
    // type: "postgres",
    // host: "localhost",
    // port: 5432,
    // username: "admin",
    // password: "123",
    // database: "gestor_turnos",
    // //dropSchema: true,
    // synchronize: true,
    // logging: false,
    // entities: [User, Turn, Credential],
    // subscribers: [],
    // migrations: [],
    type: envs_1.DB_TYPE,
    host: envs_1.DB_HOST,
    port: Number(envs_1.PORT),
    username: envs_1.DB_USER,
    password: envs_1.DB_PASS,
    database: envs_1.DB_NAME,
    //dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [User_1.User, Turn_1.Turn, Credential_1.Credential],
    subscribers: [],
    migrations: [],
});
exports.UserModel = exports.AppDataSource.getRepository(User_1.User);
exports.TurnModel = exports.AppDataSource.getRepository(Turn_1.Turn);
exports.CredentialModel = exports.AppDataSource.getRepository(Credential_1.Credential);
