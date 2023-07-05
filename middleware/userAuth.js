import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const userAuth = (req, res, next) => {
  let token = "";

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }


  if (!token) {
    console.log("no token");
    const err = { message: "no token", statusCode: 400 };
    throw err;
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    

    if (!payload) {
      throw new Error("Invalid token");
    }
    req.user = payload.userId;
    next();
  } catch (err) {
    console.log(err);
    next(err)
  }
};

export default userAuth;
