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
Object.defineProperty(exports, "__esModule", { value: true });
exports.preloadData = void 0;
const data_source_1 = require("../config/data-source");
const user1 = {
    name: "Juan",
    email: "juan@gmail.com",
    birthdate: "2019-01-01",
    nDni: "12345678",
    credentialsId: 1
};
const user2 = {
    name: "Pedro",
    email: "pedro@gmail.com",
    birthdate: "2019-01-01",
    nDni: "6677788899",
    credentialsId: 2
};
const user3 = {
    name: "Maria",
    email: "maria@gmail.com",
    birthdate: "2019-01-01",
    nDni: "111222334",
    credentialsId: 3
};
const user4 = {
    name: "Jose",
    email: "jose@gmail.com",
    birthdate: "2019-01-01",
    nDni: "444555666",
    credentialsId: 4
};
const users = [user1, user2, user3, user4];
const preloadData = () => __awaiter(void 0, void 0, void 0, function* () {
    const queryRunner = data_source_1.AppDataSource.createQueryRunner();
    yield queryRunner.connect();
    const promises = users.map((user) => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = yield data_source_1.UserModel.create(user);
        yield queryRunner.manager.save(newUser);
        queryRunner.manager.save(newUser).then(res => {
            console.log("User created");
        }).catch(err => {
            console.log("Error creating user", err);
        });
    }));
    try {
        yield queryRunner.startTransaction();
        yield Promise.all(promises);
        console.log("Users created");
        yield queryRunner.commitTransaction();
    }
    catch (error) {
        yield queryRunner.rollbackTransaction();
    }
    finally {
        yield queryRunner.release();
    }
});
exports.preloadData = preloadData;
