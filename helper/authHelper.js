import bcrypt from "bcrypt";
import User from "../model/userSchema.js";

export const userRegister = async (details, next) => {
  if (details.password && details.email && details.name) {
    const existingUser = await User.findOne({ email: details.email });
    if (existingUser) {
      const err = { message: "Email already exists", statusCode: 409 };
      throw err;
    }

    details.password = await bcrypt.hash(details?.password, 10);
    return await User.create(details);
  } else {
    const err = { message: "Credentials required", statusCode: 400 };
    throw err;
  }
};

export const userLogin = async (details, next) => {
  if (!details.email && !details.password) {
    const err = { message: "Required all credentials", statusCode: 400 };
    throw err;
  } else {
    const response = await User.findOne({ email: details.email });
    
    if (response) {
      const auth = await bcrypt.compare(details.password, response.password);
      if (!auth) {
        const err = { message: "Invalid password", statusCode: 401 };
        throw err;
      } else {
        return { _id: response._id, email: response.email, name:response.name };
      }
    } else {
      const err = { message: "User does not exist", statusCode: 404 };
      throw err;
    }
  }
};

 