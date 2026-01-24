import type { Request, Response } from 'express';
import type { clientResponse } from '../utils/myTypes.js';
import cloudinary from '../utils/cloudinary.js';
import options from '../utils/cloudinaryOptions.js';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import dbuser from '../model/userSchema.js';
import type { UploadApiResponse } from 'cloudinary';

const uploadCon = async (req: Request, res: Response) => {
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
                    process.env.ACTOKENKEY,
                ) as myToken;
                user = userT.user;
            } catch (error) {
                const cleintRes: clientResponse = {
                    message: 'token corrupted',
                    mission: 'failed',
                };
                return res.status(401).json(cleintRes);
            }
        } else {
            const cleintRes: clientResponse = {
                message: 'invalid token style',
                mission: 'failed',
            };
            return res.status(401).json(cleintRes);
        }
    } else {
        const cleintRes: clientResponse = {
            message: 'please signin to uploads (token not found)',
            mission: 'failed',
        };
        return res.status(401).json(cleintRes);
    }
    if (req.files && Array.isArray(req.files) && req.files?.length > 0) {
        const imgDataAr: UploadApiResponse[] = [];
        for (const file of req.files) {
            if (file.path) {
                try {
                    const imgData = await cloudinary.uploader.upload(
                        file?.path,
                        options,
                    );
                    imgDataAr.push(imgData);
                    await dbuser.updateOne(
                        { key: user },
                        {
                            $push: {
                                docName: imgData.original_filename,
                                documents: imgData.secure_url,
                            },
                        },
                    );
                    fs.unlink(file?.path, (err) => {
                        if (err) {
                            console.log('cannot delete the file');
                        }
                    });
                } catch (error) {
                    console.log(error);
                    const cleintRes: clientResponse = {
                        message: 'failed to upload the files...',
                        mission: 'failed',
                    };
                    return res.json(cleintRes);
                }
            } else {
                const cleintRes: clientResponse = {
                    message: 'failed to upload the files',
                    mission: 'failed',
                };
                return res.json(cleintRes);
            }
        }
        interface uploadResponse extends clientResponse {
            info: {
                docName: string[];
                documents: string[];
            };
        }
        const imgDataOrg = imgDataAr.map((e) => e.original_filename);
        const imgDataUrl = imgDataAr.map((e) => e.secure_url);
        const cleintRes: uploadResponse = {
            message: 'file uploaded successfully',
            mission: 'success',
            info: {
                docName: imgDataOrg,
                documents: imgDataUrl,
            },
        };
        return res.json(cleintRes);
    } else {
        return res
            .json(400)
            .json({ message: 'something went wrong', mission: 'failed' });
    }
};

export default uploadCon;
