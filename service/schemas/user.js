// npm modules
import { Schema, model } from "mongoose";
import bCrypt from "bcrypt";

// register swagger
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


// login swagger
/**
 * @openapi
 * components:
 *  schemas:
 *    LoginUserInput:
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
 *    LoginUserResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        email:
 *          type: string
 *        token:
 *          type: string
 */


// update user swagger
/**
 * @openapi
 * components:
 *  schemas:
 *    UpdateUserInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: example@email.com
 *        password:
 *          type: string
 *          default: examplePassword123
 *    UpdateUserResponse:
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


// get user swagger
/**
 * @openapi
 * components:
 *  schemas:
 *    GetUserInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: example@email.com
 *        password:
 *          type: string
 *          default: examplePassword123
 *    GetUserResponse:
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


// subscribe swagger
/**
 * @openapi
 * components:
 *  schemas:
 *    SubscribeInput:
 *      type: object
 *      required:
 *        - email
 *      properties:
 *        email:
 *          type: string
 *          default: example@email.com
 *    SubscribeResponse:
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
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: 'recipe'
    }
  ],
  shoppingList: [
    {
      ingredient: {
        type: Schema.Types.ObjectId,
        ref: 'ingredient'
      },
      quantity: {
        type: Number,
        required: [true, "Quantity of ingredient is required"]
      },
      measure: {
        type: String,
        enum: ["tbs", "tsp", "kg", "g", "ml", "piece"],
        required: [true, "Measure of ingredient is required"]
      },
    }
  ]
});

userSchema.methods.setPassword = async function (password) {
  this.password = await bCrypt.hash(password, 10);
};

userSchema.methods.validatePassword = async function (password) {
  return await bCrypt.compare(password, this.password);
};

const User = model("user", userSchema, "users");

export default User;
