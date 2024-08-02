// npm modules
import express from "express";
import authorization from "../middlewares/jwtMiddleware.js";

// my modules

const route = express.Router();

// testing route
route.get("/", (req, res) => {
  res.send("Hello World");
});

route.post("/subscribe", authorization, subscribeNewsletter);

export default route;
