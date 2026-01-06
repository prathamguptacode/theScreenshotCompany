import express from "express";
import authUser from "../controller/authUser.js";
const router = express.Router()

router.post('/user',authUser)

export default router