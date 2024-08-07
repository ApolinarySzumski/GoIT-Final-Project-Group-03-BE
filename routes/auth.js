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
 *   responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      400:
 *        description: Bad request
 *      409:
 *        description: Conflict
 */
route.post("/register", validateBody(registerSchema), registerUser);

/**
 * @openapi
 * '/users/login':
 *  post:
 *   tags:
 *   - User
 *   summary: Login a user
 *   responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      400:
 *        description: Bad request
 *      401:
 *        description: Email or password is incorrect
*/
route.post("/login", validateBody(loginSchema), loginUser);



route.get("/current", authorization, getUser);



route.patch(
  "/update",
  authorization,
  validateBody(updateDetailsSchema),
  updateUserDetails,
);


/**
 * @openapi
 * '/users/logoutUser':
 *  post:
 *   tags:
 *   - User
 *   summary: Logout a user
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
