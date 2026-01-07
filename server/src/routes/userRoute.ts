import express from 'express';
import authUser from '../controller/authUser.js';
import upload from '../middleware/multerSet.js';
import uploadCon from '../controller/uploadShot.js';
import type { Request, Response } from 'express';
import type { clientResponse } from '../utils/myTypes.js';
import deleteShot from '../controller/deleteShot.js';
const router = express.Router();

router.post('/user', authUser);

router.post('/upload', upload.single('file'), uploadCon);

router.get('/signout',(req: Request,res: Response)=>{
    res.clearCookie('userToken');
    const clientRes: clientResponse={message: 'user signed out', mission: "success"}
    res.json(clientRes)
})

router.delete('/del',deleteShot)

export default router;
