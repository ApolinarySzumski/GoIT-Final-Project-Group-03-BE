// npm modules
import express from "express";
import authorization from "../middlewares/jwtMiddleware.js";
import getCategoryNames from "../controller/recipes/getCategoryNames.js";
import getRecipes from '../controller/recipes/getRecipes.js';
import getRecipesByCategory from '../controller/recipes/getRecipesByCategory.js'
import getRecipeById from '../controller/recipes/getRecipeById.js'

// my modules

const route = express.Router();

route.get("/category-list", authorization, getCategoryNames);

route.get('/main-page', authorization, getRecipes);

route.get('/category/:category', authorization, getRecipesByCategory);

route.get('/:id', authorization, getRecipeById);

export default route;
