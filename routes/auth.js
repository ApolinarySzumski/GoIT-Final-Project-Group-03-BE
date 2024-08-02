// npm modules
import express from "express";

// my modules
import passport from "../config/passportConfig.js";
import { login, register } from "../controller/auth.js";

const route = express.Router();

route.use(passport.initialize());

route.post("/register", register);
route.post("/login", login);

export default route;
