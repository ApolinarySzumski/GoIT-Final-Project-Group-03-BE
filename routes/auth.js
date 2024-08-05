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
} from "../validation/userValidation.js";

const route = express.Router();

route.use(passport.initialize());

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
