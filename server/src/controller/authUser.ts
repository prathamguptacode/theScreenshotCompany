import type { Request, Response } from 'express';
import type { clientResponse } from '../utils/myTypes.js';
import user from '../model/userSchema.js';
import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';

async function authUser(req: Request, res: Response) {
    let key: string = req.body?.key;
    const signCan: boolean = req.body?.signCan;
    const tokenC = req.cookies?.userToken;

    if (tokenC) {
        if (process.env.TOKENKEY) {
            interface clientToken extends JwtPayload {
                user: string;
            }
            try {
                const userVal = jwt.verify(
                    tokenC,
                    process.env.TOKENKEY
                ) as clientToken;
                key = userVal.user;
            } catch (error) {
                console.log('invalid token ');
            }
        }
    }

    if (!key) {
        const clientRes: clientResponse = {
            message: 'key not found',
            mission: 'failed',
        };
        return res.status(403).json(clientRes);
    }

    const myUser = await user.findOne({ key });

    if (!myUser) {
        // if user does not exists we create one
        const newUser = new user({
            key,
        });
        await newUser.save();
        interface myResponse extends clientResponse {
            documents: string[];
            docNames: string[];
            authToken: string;
            key: string;
        }
        if (process.env.ACTOKENKEY) {
            const userData = jwt.sign({ user: key }, process.env.ACTOKENKEY, {
                expiresIn: '0.5h',
            });
            const clientRes: myResponse = {
                message: `welcome new user ${newUser.key}`,
                mission: 'success',
                documents: newUser.documents,
                docNames: newUser.docName,
                authToken: userData,
                key: key,
            };
            if (signCan) {
                //sending cookies to stay signed in
                if (process.env.TOKENKEY) {
                    const token = jwt.sign({ user: key }, process.env.TOKENKEY);
                    res.cookie('userToken', token, { httpOnly: true , secure: true , sameSite: 'none' });
                } else {
                    console.error('something went wrong jwt keys not found');
                }
            }
            return res.json(clientRes);
        } else {
            console.error('something went wrong jwt keys not found');
        }
    }

    if (myUser) {
        interface myResponse extends clientResponse {
            documents: string[];
            docNames: string[];
            authToken: string;
            key: string;
        }
        if (signCan) {
            //sending cookies to stay signed in
            if (process.env.TOKENKEY) {
                const token = jwt.sign({ user: key }, process.env.TOKENKEY);
                res.cookie('userToken', token, { httpOnly: true , secure: true , sameSite: 'none' });
            } else {
                console.error('something went wrong jwt keys not found');
            }
        }
        if (process.env.ACTOKENKEY) {
            const userData = jwt.sign({ user: key }, process.env.ACTOKENKEY, {
                expiresIn: '0.5h',
            });
            const clientRes: myResponse = {
                message: `welcome user ${myUser.key}`,
                mission: 'success',
                documents: myUser.documents,
                docNames: myUser.docName,
                authToken: userData,
                key: key,
            };
            return res.json(clientRes);
        } else {
            console.error('something went wrong jwt keys not found');
        }
    }
}

export default authUser;
