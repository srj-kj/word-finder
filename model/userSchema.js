import { Schema, model } from "mongoose";
const userschema = new Schema({
  name: {
    type: "string",
    required: true,
    min: 3,
  },  
  email: {
    type: "string",
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: "string",
    min: 5,
    required: true,
  },

});

const User = model("users", userschema, "users");
export default User;