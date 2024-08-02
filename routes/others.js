// npm modules
import express from "express";
import auth from "../middlewares/jwtMiddleware.js";

// my modules
import { subscribeNewsletter } from "../controller/others.js";

const route = express.Router();

// testing route
route.get("/", (req, res) => {
  res.send("Hello World");
});

route.post("/subscribe", auth, subscribeNewsletter);

export default route;
