"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByIdService = exports.deleteUsersService = exports.getUsersService = exports.createUserService = void 0;
const credentialsService_1 = require("./credentialsService");
const data_source_1 = require("../config/data-source");
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const TurnRepository_1 = __importDefault(require("../repositories/TurnRepository"));
let users = [];
let id = 1;
const createUserService = (userDto, credentialDto) => __awaiter(void 0, void 0, void 0, function* () {
    const queryRunner = data_source_1.AppDataSource.createQueryRunner();
    yield queryRunner.connect();
    try {
        queryRunner.startTransaction();
        const credential = yield (0, credentialsService_1.createCredentialService)(credentialDto.username, credentialDto.password);
        const user = yield UserRepository_1.default.create({
            name: userDto.name,
            email: userDto.email,
            birthdate: userDto.birthdate,
            nDni: userDto.nDni,
            //credentialsId: credential.id
        });
        yield queryRunner.manager.save(user);
        yield queryRunner.commitTransaction();
        return user;
    }
    catch (error) {
        yield queryRunner.rollbackTransaction();
        throw Error("Error creating user");
    }
    finally {
        yield queryRunner.release();
    }
});
exports.createUserService = createUserService;
const getUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield UserRepository_1.default.find();
    for (let user of users) {
        const turns = yield TurnRepository_1.default.findBy({ userId: user.id });
        user.turns = turns;
    }
    return users;
});
exports.getUsersService = getUsersService;
const deleteUsersService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserRepository_1.default.delete({ id });
    return;
});
exports.deleteUsersService = deleteUsersService;
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserRepository_1.default.findOneBy({ id });
    if (user === null) {
        return null;
    }
    const turns = yield TurnRepository_1.default.findBy({ userId: user.id });
    user.turns = turns;
    return user;
});
exports.getUserByIdService = getUserByIdService;
