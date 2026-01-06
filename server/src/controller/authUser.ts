import type { Request, Response } from 'express';
import type { clientResponse } from '../utils/myTypes.js';
import user from '../model/userSchema.js';
import jwt from 'jsonwebtoken';

async function authUser(req: Request, res: Response) {
    const key: String = req.body?.key;
    const signCan: boolean = req.body?.signCan;

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
            docNames: string[];
        }
        const clientRes: myResponse = {
            message: `welcome user ${myUser.key}`,
            mission: 'success',
            documents: myUser.documents,
            docNames: myUser.docName,
        };
        if (signCan) {
            //sending cookies to stay signed in
            if (process.env.TOKENKEY) {
                const token = jwt.sign({ user: key }, process.env.TOKENKEY);
                res.cookie('userToken', token, { httpOnly: true });
            } else {
                console.error('something went wrong jwt keys not found');
            }
            //for checking in frontend for design changes
            const userData = true;
            res.cookie('userPermit', userData);
        }
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
