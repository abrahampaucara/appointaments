import { Router } from "express";
import usersRouter from "./usersRouter";
import appointmentsRouter from "./appointmentsRouter";
import auth from "../middlewares/auth";

const router: Router = Router();

router.use("/user", usersRouter);
router.use("/turns", appointmentsRouter);

export default router;