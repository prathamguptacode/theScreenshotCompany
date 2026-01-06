import type { Request, Response } from 'express';
import type { clientResponse } from '../utils/myTypes.js';
import cloudinary from '../utils/cloudinary.js';
import options from '../utils/cloudinaryOptions.js';
import fs from 'fs';

const uploadCon=async (req: Request, res: Response) => {
    if (req.file?.path) {
        try {
            const imgData = await cloudinary.uploader.upload(
                req.file?.path,
                options
            );
            console.log(imgData);
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