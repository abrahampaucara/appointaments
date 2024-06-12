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
exports.cancel = exports.schedule = exports.getAppointment = exports.getAppointments = void 0;
const turnsService_1 = require("../services/turnsService");
const getAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const turns = yield (0, turnsService_1.getTurnsService)();
    //const respuesta = "Obtener el listado de todos los turnos de todos los usuarios.";
    res.status(200).json(turns);
});
exports.getAppointments = getAppointments;
const getAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const turn = yield (0, turnsService_1.getTurnByIdService)(Number(id));
    if (!turn) {
        res.status(404).json({ message: "Turn not found" });
        return;
    }
    //const respuesta = "Obtener el detalle de un turno específico.";
    res.status(200).json(turn);
});
exports.getAppointment = getAppointment;
const schedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = "active";
    const { date, time, userId } = req.body;
    if (!date || !time || !userId) {
        res.status(400).json({ message: "Datos incorrectos." });
        return;
    }
    const newTurn = yield (0, turnsService_1.createTurnService)({ date, time, userId, status }, userId);
    if (!newTurn) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    res.status(201).json(newTurn);
});
exports.schedule = schedule;
const cancel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const cancelledTurn = yield (0, turnsService_1.cancelTurnService)(Number(id));
    if (cancelledTurn.affected === 0) {
        res.status(404).json({ message: "Turno no fue encontrado." });
        return;
    }
    //const respuesta = "Cambiar el estatus de un turno a cancelled.";
    res.status(200).json(cancelledTurn);
});
exports.cancel = cancel;
