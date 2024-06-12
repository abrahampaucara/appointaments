import { Request, Response } from "express"
import { createUserService, getUsersService, deleteUsersService, getUserByIdService } from "../services/usersService"
import IUser from "../intefaces/IUser";
import { validateCredentialsService, getUserByCredentialsIdService } from "../services/credentialsService";
import { User } from "../entities/User";
import UserRepository from "../repositories/UserRepository";

export const getUsers = async(req: Request, res: Response) => { 
    //const users: IUser[] = await getUsersService();
    const users: User[] = await getUsersService();
    const respuesta = "Obtener el listado de todos los usuarios.";
    res.status(200).json(users);
}

export const getUser = async(req: Request, res: Response) => { 
    const { id } = req.params;
    //const user: IUser | null = await getUserByIdService(Number(id));

    try {
        const user: User | null = await getUserByIdService(Number(id));
        const respuesta = "Obtener el detalle de un usuario específico.";
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: "User not found" });
    }
    
}

export const createUser = async(req : Request, res : Response) => { 
    //const newUser: IUser = await createUserService({ name, email, birthdate, nDni }, { username, password });
    const { name, email, birthdate, nDni, username, password } = req.body;
    try {
        const newUser: User | void = await createUserService({ name, email, birthdate, nDni }, { username, password });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: "Error creating user" });
    }
    
}

export const deleteUser = async(req: Request, res: Response) => { 
    const { id } = req.body;
    await deleteUsersService(id);
    res.status(200).json({ message: "User deleted" });
}

export const register = async(req: Request, res: Response) => { 
    const { name, email, birthdate, nDni, username, password } = req.body;
    if (!name || !email || !birthdate || !nDni || !username || !password) {
        return res.status(400).json({ message: "Datos incorrectos" });
    }
    //const newUser: IUser = await createUserService({ name, email, birthdate, nDni }, { username, password });
    const newUser: User | void = await createUserService({ name, email, birthdate, nDni }, { username, password });
    
    const respuesta = "Registro de un nuevo usuario.";
    res.status(201).json(newUser);
}

export const login = async(req: Request, res: Response) => { 
    const { username, password } = req.body;
    const credential = await validateCredentialsService(username, password);
    const login: boolean = credential !== null;
    if (credential === null) {
        res.status(401).json({ message: "Los datos son incorrectos." });
        return;
    } 
    const user = await UserRepository.findOneBy({id: credential.id});
    const respuesta = {
        login,
        user
    };
    res.status(200).json(respuesta);


    // const user = await getUserByCredentialsIdService(credentialId);
    // if (!user) {
    //     res.status(404).json({ message: "User not found" });
    //     return;
    // }
    // res.status(200).json(user);
}