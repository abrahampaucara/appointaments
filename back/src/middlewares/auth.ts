import { Request, Response, NextFunction } from 'express';

const auth = async (req: Request, res: Response, next: NextFunction) => {

    const {token} = req.headers
    if (token=== "autenticado") next();
    else res.status(400).json({ message: "Access denied" });
}

export default auth;