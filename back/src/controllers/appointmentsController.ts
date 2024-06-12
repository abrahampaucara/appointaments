import { Request, Response } from "express";
import { getTurnsService, getTurnByIdService, createTurnService, cancelTurnService } from "../services/turnsService";
import { Turn } from "../entities/Turn";

export const getAppointments = async(req: Request, res: Response) => { 
    const turns: Turn[] = await getTurnsService();
    //const respuesta = "Obtener el listado de todos los turnos de todos los usuarios.";
    res.status(200).json(turns);
}

export const getAppointment = async(req: Request, res: Response) => { 
    const { id } = req.params;
    const turn: Turn | null = await getTurnByIdService(Number(id));
    if (!turn) {
        res.status(404).json({ message: "Turn not found" });
        return;
    }
    //const respuesta = "Obtener el detalle de un turno específico.";
    res.status(200).json(turn);
}

export const schedule = async(req: Request, res: Response) => { 
    const status = "active";
    const { date, time, userId } = req.body;
    if (!date || !time || !userId) {
        res.status(400).json({ message: "Datos incorrectos." });
        return;
    }

    const newTurn = await createTurnService({date, time, userId, status}, userId);
    if (!newTurn) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    res.status(201).json(newTurn);
}

export const cancel = async(req: Request, res: Response) => { 
    const { id } = req.params;
    const cancelledTurn = await cancelTurnService(Number(id));
    if (cancelledTurn.affected === 0) {
        res.status(404).json({ message: "Turno no fue encontrado." });
        return;
    }
    //const respuesta = "Cambiar el estatus de un turno a cancelled.";
    res.status(200).json(cancelledTurn);
}