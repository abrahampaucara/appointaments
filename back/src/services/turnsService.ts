import AppointmentDto from "../dto/AppointmentDto";
import ITurn  from "../intefaces/ITurn";
import { getUserByIdService } from './usersService';
import { Turn } from "../entities/Turn";
import { User } from "../entities/User";
import { AppDataSource, TurnModel, UserModel } from "../config/data-source";
import { DeleteResult, UpdateResult } from "typeorm";
import TurnRepository from "../repositories/TurnRepository";

let turns : Turn[] = [];
let id: number = 1;

export const createTurnService = async(turn: AppointmentDto, userId: number) : Promise<Turn | null> => { 

    const user: User | null = await getUserByIdService(userId);
    if (!user) {
        return null;
    } 
    console.log(turn.date, turn.time, user.id, turn.status);
    const newTurn = await TurnModel.create({
        date: turn.date,
        time: turn.time,
        userId: user.id,
        status: turn.status
    });
    const result = await TurnModel.save(newTurn);
    return newTurn;
}

export const getTurnsService = async(): Promise<Turn[]> => { 
    const turns = await TurnModel.find();

    for (let turn of turns) {
        const user = await UserModel.findOneBy({id: turn.userId});
        if (user !== null) {
            turn.user = user;
        }
    }

    return turns;
}

export const deleteTurnService = async(id: number): Promise<void> => { 
    const turn = await TurnModel.delete({id});
    return;
}

export const getTurnByIdService = async(id: number): Promise<Turn | null> => {
    const turn = await TurnModel.findOneBy({id});
    if (turn === null) {
        return null;
    }
    const user = await UserModel.findOneBy({id: turn.userId});
    if (user !== null) {
        turn.user = user;
    }

    return turn;
}

export const cancelTurnService = async(id: number) : Promise<UpdateResult> => {
    const turn = await TurnRepository.update({id},
        {
            status: "cancelled"
        });
    return turn;
}

