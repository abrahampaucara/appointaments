import { Router } from "express";
import { getUsers, getUser, createUser, deleteUser, register, login } from "../controllers/usersController";
import auth from "../middlewares/auth";


const userRouter : Router = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.post("/register", register);
userRouter.post("/login", login);



export default userRouter;