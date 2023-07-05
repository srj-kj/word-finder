import { Schema, model } from "mongoose";

const websiteSchema = new Schema({
  userId: {
    type: String,
    ref: "User",
    required: true,
  },
  data: {
    type: Array,
    required: true,
    
  },
  
});

const Website = model("websites", websiteSchema, "websites");
export default Website;
 