// npm modules
import express from "express";

// my modules
import { subscribeNewsletter } from "../controller/others.js";

const route = express.Router();

// testing route
route.get("/", (req, res) => {
  res.send("Hello World");
});

// route.post("/subscribe", subscribeNewsletter);

export default route;
