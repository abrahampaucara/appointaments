import { Router } from "express";
import { getAppointment, getAppointments, schedule, cancel } from "../controllers/appointmentsController";
import auth from "../middlewares/auth";


const userRouter : Router = Router();

userRouter.get("/", getAppointments);
userRouter.get("/:id", getAppointment);
userRouter.post("/schedule", schedule);
userRouter.put("/cancel/:id", cancel);

export default userRouter;