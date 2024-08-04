// npm modules
import express from "express";

// my modules
import {
  getIngredients,
  getRecipesByIngredient,
} from "../controller/ingredients.js";
import authorization from "../middlewares/jwtMiddleware.js";

const route = express.Router();

route.get("/list", authorization, getIngredients);
route.get("/", authorization, getRecipesByIngredient);

export default route;
