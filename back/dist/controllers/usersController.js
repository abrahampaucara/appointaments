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
exports.login = exports.register = exports.deleteUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const usersService_1 = require("../services/usersService");
const credentialsService_1 = require("../services/credentialsService");
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const users: IUser[] = await getUsersService();
    const users = yield (0, usersService_1.getUsersService)();
    const respuesta = "Obtener el listado de todos los usuarios.";
    res.status(200).json(users);
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    //const user: IUser | null = await getUserByIdService(Number(id));
    try {
        const user = yield (0, usersService_1.getUserByIdService)(Number(id));
        const respuesta = "Obtener el detalle de un usuario específico.";
        res.status(200).json(user);
    }
    catch (error) {
        res.status(404).json({ message: "User not found" });
    }
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const newUser: IUser = await createUserService({ name, email, birthdate, nDni }, { username, password });
    const { name, email, birthdate, nDni, username, password } = req.body;
    try {
        const newUser = yield (0, usersService_1.createUserService)({ name, email, birthdate, nDni }, { username, password });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(400).json({ message: "Error creating user" });
    }
});
exports.createUser = createUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    yield (0, usersService_1.deleteUsersService)(id);
    res.status(200).json({ message: "User deleted" });
});
exports.deleteUser = deleteUser;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, birthdate, nDni, username, password } = req.body;
    if (!name || !email || !birthdate || !nDni || !username || !password) {
        return res.status(400).json({ message: "Datos incorrectos" });
    }
    //const newUser: IUser = await createUserService({ name, email, birthdate, nDni }, { username, password });
    const newUser = yield (0, usersService_1.createUserService)({ name, email, birthdate, nDni }, { username, password });
    const respuesta = "Registro de un nuevo usuario.";
    res.status(201).json(newUser);
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const credential = yield (0, credentialsService_1.validateCredentialsService)(username, password);
    const login = credential !== null;
    if (credential === null) {
        res.status(401).json({ message: "Los datos son incorrectos." });
        return;
    }
    const user = yield UserRepository_1.default.findOneBy({ id: credential.id });
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
});
exports.login = login;
