"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersRouter_1 = __importDefault(require("./usersRouter"));
const appointmentsRouter_1 = __importDefault(require("./appointmentsRouter"));
const router = (0, express_1.Router)();
router.use("/user", usersRouter_1.default);
router.use("/turns", appointmentsRouter_1.default);
exports.default = router;
