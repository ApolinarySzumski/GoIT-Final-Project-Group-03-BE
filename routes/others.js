// npm modules
import express from "express";

// my modules

const route = express.Router();

// testing route
route.get("/", (req, res) => {
  res.send("Hello World");
});

// route.post("/subscribe", subscribeNewsletter);

export default route;
