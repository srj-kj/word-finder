import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateAccessToken = async (userId) => {
  try {
    const acessToken= await jwt.sign({ userId: userId.toString() }, process.env.JWT_TOKEN_SECRET, { expiresIn: '30d' });
   console.log(acessToken);
    return acessToken
  } catch (error) {
    console.log("error from JWT auth", error);
    throw error;
  }
};


