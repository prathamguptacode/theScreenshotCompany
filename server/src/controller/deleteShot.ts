import type { Request, Response } from 'express';
import { extractPublicId } from 'cloudinary-build-url';
import type { clientResponse } from '../utils/myTypes.js';
import cloudinary from '../utils/cloudinary.js';
import type { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import userDB from '../model/userSchema.js';

async function deleteShot(req: Request, res: Response) {
    const url: string = req.body?.url;
    const name: string = req.body?.name;

    if (!url) {
        const cleintRes: clientResponse = {
            message: 'deleting img url not found',
            mission: 'failed',
        };
        return res.json(cleintRes);
    }
    
    if (!name) {
        const cleintRes: clientResponse = {
            message: 'deleting name not found',
            mission: 'failed',
        };
        return res.json(cleintRes);
    }

    const userToken = req.headers.authorization;
    let user = '';
    if (userToken && typeof userToken == 'string') {
        const token = userToken.split(' ')[1];
        if (process.env.ACTOKENKEY && token) {
            interface myToken extends JwtPayload {
                user: string;
            }
            try {
                const userT = jwt.verify(
                    token,
                    process.env.ACTOKENKEY
                ) as myToken;
                user = userT.user;
            } catch (error) {
                const cleintRes: clientResponse = {
                    message: 'token corrupted',
                    mission: 'failed',
                };
                return res.status(400).json(cleintRes);
            }
        } else {
            const cleintRes: clientResponse = {
                message: 'invalid token style',
                mission: 'failed',
            };
            return res.json(cleintRes);
        }
    } else {
        const cleintRes: clientResponse = {
            message: 'please signin to uploads (token not found)',
            mission: 'failed',
        };
        return res.json(cleintRes);
    }

    const publicId = extractPublicId(url);
    await cloudinary.uploader.destroy(publicId, async (err, val) => {
        if (err) {
            const cleintRes: clientResponse = {
                message: 'could not delete the file',
                mission: 'failed',
            };
            return res.json(cleintRes);
        }
        const cleintRes: clientResponse = {
            message: 'image deleted by cloudinary',
            mission: 'success',
        };
        await userDB.updateOne(
            { key: user },
            { $pop: { documents: url, docName: name } }
        );
        // we also have to del the use name but
        return res.json(cleintRes);
    });
}

export default deleteShot;
