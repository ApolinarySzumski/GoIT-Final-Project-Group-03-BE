// npm modules
import express from "express";

// my modules
import passport from "../config/passportConfig.js";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUserDetails,
} from "../controller/users/index.js";
import authorization from "../middlewares/jwtMiddleware.js";
import validateBody, {
  loginSchema,
  registerSchema,
  updateDetailsSchema,
} from "../middlewares/validation/userValidation.js";

const route = express.Router();

route.use(passport.initialize());

/**
 * @openapi
 * '/users/register':
 *  post:
 *   tags:
 *   - User
 *   summary: Register a user
 *  requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/CreateUserInput'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 *
 */

route.post("/register", validateBody(registerSchema), registerUser);
route.post("/login", validateBody(loginSchema), loginUser);
route.get("/current", authorization, getUser);
route.patch(
  "/update",
  authorization,
  validateBody(updateDetailsSchema),
  updateUserDetails,
);
route.get("/logout", authorization, logoutUser);

export default route;
