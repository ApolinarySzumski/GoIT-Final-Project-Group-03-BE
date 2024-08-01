// npm modules
import express from "express";

// my modules
import authorizatiion from "../middlewares/jwtMiddleware.js";
import passport from "../middlewares/passportConfig.js";
import { register, login, getCurrentUser } from "../controller/auth.js";

const route = express.Router();

route.use(passport.initialize());

route.post("/register", register);
route.post("/login", login);
route.get("/current", authorizatiion, getCurrentUser);

export default route;
