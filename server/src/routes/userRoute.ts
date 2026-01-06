import express from 'express';
import authUser from '../controller/authUser.js';
import upload from '../middleware/multerSet.js';
import uploadCon from '../controller/uploadShot.js';
const router = express.Router();

router.post('/user', authUser);

router.post('/upload', upload.single('file'), uploadCon);

export default router;
