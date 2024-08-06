// npm modules
import express from "express";

// my modules
import {
  getIngredients,
  getRecipesByIngredient,
} from "../controller/ingredients.js";
import authorization from "../middlewares/jwtMiddleware.js";

const route = express.Router();

route.use(authorization);

route.get("/list", getIngredients);
route.get("/:ingredient", getRecipesByIngredient);

export default route;
