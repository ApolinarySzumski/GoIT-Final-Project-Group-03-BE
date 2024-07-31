// npm modules
import { Schema, model } from "mongoose";
import bCrypt from "bcrypt";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  token: {
    type: String,
    default: null,
  },
  subscribe: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.setPassword = async function (password) {
  this.password = await bCrypt.hash(password, 10);
};

userSchema.methods.validatePassword = async function (password) {
  return await bCrypt.compare(password, this.password);
};

const User = model("user", userSchema, "users");

export default User;
