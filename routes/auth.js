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
 *   summary: Register user
 *   responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      201:
 *        description: User registered successfully
 *      400:
 *        description: Bad request
 *      409:
 *        description: Conflict, Email already in use
 */
route.post("/register", validateBody(registerSchema), registerUser);

/**
 * @openapi
 * '/users/login':
 *  post:
 *   tags:
 *   - User
 *   summary: Login user
 *   responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginUserResponse'
 *      400:
 *        description: Bad request
 *      401:
 *        description: Email or password is incorrect
*/
route.post("/login", validateBody(loginSchema), loginUser);


/**
 * @openapi
 * '/users/current':
 *  get:
 *   tags:
 *   - User
 *   summary: Get user
 *   responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetUserResponse'
 *      400:
 *        description: Bad request
 *      401:
 *        description: Email or password is incorrect
*/
route.get("/current", authorization, getUser);


/**
 * @openapi
 * '/users/update':
 *  patch:
 *   tags:
 *   - User
 *   summary: Update user
 *   responses:
 *      200:
 *        description: Success, Details have been updated succesfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UpdateUserResponse'
 *      400:
 *        description: Bad request
 *      404:
 *        description: User not found
*/
route.patch(
  "/update",
  authorization,
  validateBody(updateDetailsSchema),
  updateUserDetails,
);


/**
 * @openapi
 * '/users/logoutUser':
 *  get:
 *   tags:
 *   - User
 *   summary: Logout user
 *   responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      204:
 *        description: No content
 *      400:
 *        description: Bad request
 */
route.get("/logout", authorization, logoutUser);

export default route;
