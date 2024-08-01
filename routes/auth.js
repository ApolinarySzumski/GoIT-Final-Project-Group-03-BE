// npm modules
import express from "express";

// my modules
import authorization from "../middlewares/jwtMiddleware.js";
import validateBody, {
  registerSchema,
  loginSchema,
  updateDetailsSchema,
} from "../validation/userValidation.js";
import passport from "../middlewares/passportConfig.js";
import {
  register,
  login,
  getCurrentUser,
  updateUserDetails,
  logout,
} from "../controller/auth.js";

const route = express.Router();

route.use(passport.initialize());

route.post("/register", validateBody(registerSchema), register);
route.post("/login", validateBody(loginSchema), login);
route.get("/current", authorization, getCurrentUser);
route.patch(
  "/",
  authorization,
  validateBody(updateDetailsSchema),
  updateUserDetails
);
route.get("/logout", authorization, logout);

export default route;
