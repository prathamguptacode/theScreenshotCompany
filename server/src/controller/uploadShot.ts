import type { Request, Response } from 'express';
import type { clientResponse } from '../utils/myTypes.js';
import cloudinary from '../utils/cloudinary.js';
import options from '../utils/cloudinaryOptions.js';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import type {JwtPayload} from 'jsonwebtoken'
import dbuser from '../model/userSchema.js'

const uploadCon=async (req: Request, res: Response) => {

    const userToken=req.headers["Authorization"];
    let user="";
    if(typeof userToken == "string"){
        const token=userToken.split(' ')[1];
        if(process.env.ACTOKENKEY && token){
            interface myToken extends jwt.JwtPayload{
                user: string
            }
            const userT=jwt.verify(token,process.env.ACTOKENKEY) as myToken
            user=userT.user;
        }
    }


    if (req.file?.path) {
        try {
            const imgData = await cloudinary.uploader.upload(
                req.file?.path,
                options
            );
            console.log(imgData);
            await dbuser.updateOne({key: user},{ $push :{docName: imgData.original_filename}, documents: imgData.secure_url })
        } catch (error) {
            console.log(error);
            const cleintRes: clientResponse = {
                message: 'failed to upload the files',
                mission: 'failed',
            };
            return res.json(cleintRes);
        }
        const cleintRes: clientResponse = {
            message: 'file uploaded successfully',
            mission: 'success',
        };
        fs.unlink(req.file?.path, (err) => {
            if (err) {
                console.error('connot delete the file ' + req.file?.path);
            }
        });
        return res.json(cleintRes);
    } else {
        const cleintRes: clientResponse = {
            message: 'failed to upload the files',
            mission: 'failed',
        };
        return res.json(cleintRes);
    }
};

export default uploadCon