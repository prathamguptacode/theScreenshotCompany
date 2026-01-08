import express from 'express';
import authUser from '../controller/authUser.js';
import upload from '../middleware/multerSet.js';
import uploadCon from '../controller/uploadShot.js';
import deleteShot from '../controller/deleteShot.js';
const router = express.Router();
router.post('/user', authUser);
router.post('/upload', upload.single('file'), uploadCon);
router.get('/signout', (req, res) => {
    res.clearCookie('userToken');
    const clientRes = { message: 'user signed out', mission: "success" };
    res.json(clientRes);
});
router.post('/del', deleteShot);
export default router;
//# sourceMappingURL=userRoute.js.map