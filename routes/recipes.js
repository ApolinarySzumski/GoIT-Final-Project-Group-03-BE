// npm modules
import express from "express";
import authorization from "../middlewares/jwtMiddleware.js";
import getCategoryNames from "../controller/recipes/getCategoryNames.js";

// my modules

const route = express.Router();

route.get("/category-list", authorization, getCategoryNames);

export default route;
