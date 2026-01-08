import { extractPublicId } from 'cloudinary-build-url';
import cloudinary from '../utils/cloudinary.js';
import jwt from 'jsonwebtoken';
import userDB from '../model/userSchema.js';
async function deleteShot(req, res) {
    const url = req.body?.url;
    const name = req.body?.name;
    if (!url) {
        const cleintRes = {
            message: 'deleting img url not found',
            mission: 'failed',
        };
        return res.json(cleintRes);
    }
    if (!name) {
        const cleintRes = {
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
            try {
                const userT = jwt.verify(token, process.env.ACTOKENKEY);
                user = userT.user;
            }
            catch (error) {
                const cleintRes = {
                    message: 'token corrupted',
                    mission: 'failed',
                };
                return res.status(400).json(cleintRes);
            }
        }
        else {
            const cleintRes = {
                message: 'invalid token style',
                mission: 'failed',
            };
            return res.json(cleintRes);
        }
    }
    else {
        const cleintRes = {
            message: 'please signin to uploads (token not found)',
            mission: 'failed',
        };
        return res.json(cleintRes);
    }
    const publicId = extractPublicId(url);
    await cloudinary.uploader.destroy(publicId, async (err, val) => {
        if (err) {
            const cleintRes = {
                message: 'could not delete the file',
                mission: 'failed',
            };
            return res.json(cleintRes);
        }
        const cleintRes = {
            message: 'image deleted by cloudinary',
            mission: 'success',
        };
        await userDB.updateOne({ key: user }, { $pull: { documents: url, docName: name } });
        // we also have to del the use name but
        return res.json(cleintRes);
    });
}
export default deleteShot;
//# sourceMappingURL=deleteShot.js.map