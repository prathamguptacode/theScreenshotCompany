import type { Request, Response } from 'express';
import type { clientResponse } from '../utils/myTypes.js';
import user from '../model/userSchema.js';

async function authUser(req: Request, res: Response) {
    const key: String | undefined = req.body?.key;

    if (!key) {
        const clientRes: clientResponse = {
            message: 'key not found',
            mission: 'failed',
        };
        return res.json(clientRes);
    }

    const myUser = await user.findOne({ key });

    if (myUser) {
        interface myResponse extends clientResponse {
            documents: string[];
        }
        const clientRes: myResponse = {
            message: `welcome user ${myUser.key}`,
            mission: 'success',
            documents: myUser.documents,
        };
        return res.json(clientRes);
    }

    // if user does not exists we create one
    const newUser = new user({
        key,
    });
    await newUser.save();
    interface myResponse extends clientResponse {
        documents: string[];
    }
    const clientRes: myResponse = {
        message: `welcome new user`,
        mission: 'success',
        documents: newUser.documents,
    };
    return res.json(clientRes);
}

export default authUser;
