import cloudinary from '../utils/cloudinary.js';
import options from '../utils/cloudinaryOptions.js';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import dbuser from '../model/userSchema.js';
const uploadCon = async (req, res) => {
    const userToken = req.headers.authorization;
    let user = '';
    if (userToken && typeof userToken == 'string') {
        const token = userToken.split(' ')[1];
        if (process.env.ACTOKENKEY && token) {
            try {
                const userT = jwt.verify(token, process.env.ACTOKENKEY);
                user = userT.user;
            }
            catch (error) {
                const cleintRes = {
                    message: 'token corrupted',
                    mission: 'failed',
                };
                return res.status(401).json(cleintRes);
            }
        }
        else {
            const cleintRes = {
                message: 'invalid token style',
                mission: 'failed',
            };
            return res.status(401).json(cleintRes);
        }
    }
    else {
        const cleintRes = {
            message: 'please signin to uploads (token not found)',
            mission: 'failed',
        };
        return res.status(401).json(cleintRes);
    }
    if (req.file?.path) {
        try {
            const imgData = await cloudinary.uploader.upload(req.file?.path, options);
            console.log(imgData);
            await dbuser.updateOne({ key: user }, {
                $push: {
                    docName: imgData.original_filename,
                    documents: imgData.secure_url,
                },
            });
            const cleintRes = {
                message: 'file uploaded successfully',
                mission: 'success',
                info: {
                    docName: imgData.original_filename,
                    documents: imgData.secure_url,
                },
            };
            fs.unlink(req.file?.path, (err) => {
                if (err) {
                    console.log('cannot delete the file');
                }
            });
            return res.json(cleintRes);
        }
        catch (error) {
            console.log(error);
            const cleintRes = {
                message: 'failed to upload the files...',
                mission: 'failed',
            };
            return res.json(cleintRes);
        }
    }
    else {
        const cleintRes = {
            message: 'failed to upload the files',
            mission: 'failed',
        };
        return res.json(cleintRes);
    }
};
export default uploadCon;
//# sourceMappingURL=uploadShot.js.map