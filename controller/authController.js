
import dotenv from "dotenv";
import { userLogin, userRegister } from "../helper/authHelper.js";
import { generateAccessToken } from "../auth/auth.js";

dotenv.config();


export const signup = async (req, res,next) => {
    try {
        const response = await userRegister(req.body)
        res.status(200).json(response)
    } catch (error) {
        next(error);
      }
}

export const login = async (req, res,next) => {
    try {
        const response = await userLogin(req.body);
        const accessToken = await generateAccessToken(response._id);
        res.cookie('accessToken', accessToken, { httpOnly: true });
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

export const logout = async (req, res, next) => {
    try {
      res.clearCookie('accessToken', { httpOnly: true });
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      next(error);
    }
  };
  


