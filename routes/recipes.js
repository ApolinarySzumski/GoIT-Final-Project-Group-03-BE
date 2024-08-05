// npm modules
import express from "express";
import authorization from "../middlewares/jwtMiddleware.js";
import getCategoryNames from "../controller/recipes/getCategoryNames.js";
import getRecipes from "../controller/recipes/getRecipes.js";
import getRecipesByCategory from "../controller/recipes/getRecipesByCategory.js";
import getRecipeById from "../controller/recipes/getRecipeById.js";
import getIngredients from "../controller/recipes/getIngredientNames.js";
import getRecipesByIngredient from "../controller/recipes/getRecipesByIngredientId.js";

// my modules

const route = express.Router();

route.use(authorization);

route.get("/category-list", getCategoryNames);

route.get("/main-page", getRecipes);

route.get("/category/:category", getRecipesByCategory);

route.get("/:id", getRecipeById);

route.get("/list", getIngredients);

route.get("/:ingredient", getRecipesByIngredient);

export default route;
