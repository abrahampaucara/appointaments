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
exports.cancelTurnService = exports.getTurnByIdService = exports.deleteTurnService = exports.getTurnsService = exports.createTurnService = void 0;
const usersService_1 = require("./usersService");
const data_source_1 = require("../config/data-source");
const TurnRepository_1 = __importDefault(require("../repositories/TurnRepository"));
let turns = [];
let id = 1;
const createTurnService = (turn, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, usersService_1.getUserByIdService)(userId);
    if (!user) {
        return null;
    }
    console.log(turn.date, turn.time, user.id, turn.status);
    const newTurn = yield data_source_1.TurnModel.create({
        date: turn.date,
        time: turn.time,
        userId: user.id,
        status: turn.status
    });
    const result = yield data_source_1.TurnModel.save(newTurn);
    return newTurn;
});
exports.createTurnService = createTurnService;
const getTurnsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const turns = yield data_source_1.TurnModel.find();
    for (let turn of turns) {
        const user = yield data_source_1.UserModel.findOneBy({ id: turn.userId });
        if (user !== null) {
            turn.user = user;
        }
    }
    return turns;
});
exports.getTurnsService = getTurnsService;
const deleteTurnService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const turn = yield data_source_1.TurnModel.delete({ id });
    return;
});
exports.deleteTurnService = deleteTurnService;
const getTurnByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const turn = yield data_source_1.TurnModel.findOneBy({ id });
    if (turn === null) {
        return null;
    }
    const user = yield data_source_1.UserModel.findOneBy({ id: turn.userId });
    if (user !== null) {
        turn.user = user;
    }
    return turn;
});
exports.getTurnByIdService = getTurnByIdService;
const cancelTurnService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const turn = yield TurnRepository_1.default.update({ id }, {
        status: "cancelled"
    });
    return turn;
});
exports.cancelTurnService = cancelTurnService;
