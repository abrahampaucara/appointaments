import UserDto from "../dto/UserDto";
import IUser from "../intefaces/IUser";
import { createCredentialService } from './credentialsService';
import CredentialDto from "../dto/CredentialDto";
import { AppDataSource, CredentialModel, UserModel } from "../config/data-source";
import { User } from "../entities/User";
import UserRepository from "../repositories/UserRepository";
import CredentialRepository from "../repositories/CredentialRepository";
import TurnRepository from "../repositories/TurnRepository";

let users : IUser[] = [];
let id: number = 1;

export const createUserService = async(userDto: UserDto, credentialDto: CredentialDto) : Promise<User | void> => { 
    
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    try {
        queryRunner.startTransaction();
        const credential = await createCredentialService(credentialDto.username, credentialDto.password);
        const user = await UserRepository.create({
            name: userDto.name,
            email: userDto.email,
            birthdate: userDto.birthdate,
            nDni: userDto.nDni,
            //credentialsId: credential.id
        });
        await queryRunner.manager.save(user);
        await queryRunner.commitTransaction();
        return user;
        
    } catch (error) {
        await queryRunner.rollbackTransaction();
        throw Error("Error creating user");
    }finally {
        await queryRunner.release();
    }
}

export const getUsersService = async(): Promise<User[]> => { 
    const users = await UserRepository.find();

    for (let user of users) {
        const turns = await TurnRepository.findBy({userId: user.id});
        user.turns = turns;
    }
    return users;

}

export const deleteUsersService = async(id: number): Promise<void> => { 
    const user = await UserRepository.delete({id});
    return;
}

export const getUserByIdService = async(id: number): Promise<User | null> => {

    const user = await UserRepository.findOneBy({id});
    if (user === null) {
        return null;
    }

    const turns = await TurnRepository.findBy({userId: user.id});
    user.turns = turns;

    return user;
}
