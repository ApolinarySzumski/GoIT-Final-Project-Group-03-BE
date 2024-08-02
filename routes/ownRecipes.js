// npm modules
import express from "express";

//my modules
import authorization from "../middlewares/jwtMiddleware.js";
import addMyRecipe from "../controller/recipes/addMyRecipe.js";

const route = express.Router();

route.use(authorization);

route.post("/add", addMyRecipe);

export default route;
