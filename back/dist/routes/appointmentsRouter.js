"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointmentsController_1 = require("../controllers/appointmentsController");
const userRouter = (0, express_1.Router)();
userRouter.get("/", appointmentsController_1.getAppointments);
userRouter.get("/:id", appointmentsController_1.getAppointment);
userRouter.post("/schedule", appointmentsController_1.schedule);
userRouter.put("/cancel/:id", appointmentsController_1.cancel);
exports.default = userRouter;