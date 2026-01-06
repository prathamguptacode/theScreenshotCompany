import type { Request, Response, NextFunction } from 'express';
import type { clientResponse } from '../utils/myTypes.js';

function auth(req: Request, res: Response, next: NextFunction) {
    const userToken = req.cookies?.userToken;
    if (!userToken) {
        const cleintRes: clientResponse = {
            message: 'unauthorized user',
            mission: 'failed',
        };
        return res.json(cleintRes);
    }
    next()
}

export default auth