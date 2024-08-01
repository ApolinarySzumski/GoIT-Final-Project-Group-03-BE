// npm modules
import express from "express";
import auth from "../middlewares/jwtMiddleware.js";
import getCategoryNames from "../controller/recipes.js";

// my modules

const route = express.Router();

route.get('/category-list', auth, getCategoryNames);

export default route;
