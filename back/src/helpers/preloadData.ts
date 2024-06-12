import { query } from "express";
import { AppDataSource, UserModel } from "../config/data-source";
import IUser  from "../intefaces/IUser";

const user1: IUser = {
    name: "Juan",
    email: "juan@gmail.com",
    birthdate: "2019-01-01",
    nDni: "12345678",
    credentialsId: 1
}

const user2 : IUser = {
    name: "Pedro",
    email: "pedro@gmail.com",
    birthdate: "2019-01-01",
    nDni: "6677788899",
    credentialsId: 2
}

const user3 : IUser = {
    name: "Maria",
    email: "maria@gmail.com",
    birthdate: "2019-01-01",
    nDni: "111222334",
    credentialsId: 3
}

const user4 : IUser = {
    name: "Jose",
    email: "jose@gmail.com",
    birthdate: "2019-01-01",
    nDni: "444555666",
    credentialsId: 4
}

const users = [user1, user2, user3, user4];

export const preloadData = async () => {

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    const promises = users.map(async user => {
        const newUser = await UserModel.create(user);
        await queryRunner.manager.save(newUser);
        
        queryRunner.manager.save(newUser).then(res => {
            console.log("User created");
        }).catch(err => {
            console.log("Error creating user", err);
        });

    });

    try {
        await queryRunner.startTransaction();
        await Promise.all(promises);
        console.log("Users created");
        await queryRunner.commitTransaction();
        
    } catch (error) {
        await queryRunner.rollbackTransaction();
    } finally {
        await queryRunner.release();
    }   
}

