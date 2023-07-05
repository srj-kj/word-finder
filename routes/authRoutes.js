import express from "express";
import { login, logout, signup } from "../controller/authController.js";
import { dashboard, favouriteData, removeData, wordCount} from "../controller/websiteController.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();



router.post('/login',login)

router.post('/signup',signup);

router.post('/word-count',userAuth,wordCount)

router.get('/dashboard',userAuth,dashboard)

router.delete('/delete/:id',userAuth,removeData)

router.put('/favourite/:id',userAuth,favouriteData)

router.get('/logout',userAuth,logout)

export default router;
