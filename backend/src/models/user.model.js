import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    fullName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema); 
export default User;