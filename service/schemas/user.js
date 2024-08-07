// npm modules
import { Schema, model } from "mongoose";
import bCrypt from "bcrypt";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - password
 *      properties:
 *        name:
 *          type: string
 *          default: exampleName
 *        email:
 *          type: string
 *          default: example@email.com
 *        password:
 *          type: string
 *          default: examplePassword123
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        name:
 *          type: string
 *        email:
 *          type: string
 *        token:
 *          type: string
 *        subscribe:
 *          type: boolean
 */

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
