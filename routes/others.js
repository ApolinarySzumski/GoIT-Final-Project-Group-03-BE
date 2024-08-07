// npm modules
import express from "express";

// my modules
import addToFavorites from '../controller/favorites/addToFavorites.js'
import getFavoriteRecipes from '../controller/favorites/getFavoriteRecipes.js'
import addIngredientToList from '../controller/shopping-list/addIngredientToList.js'
import removeIngredientFromList from '../controller/shopping-list/removeIngredientFromList.js'
import getIngredientList from '../controller/shopping-list/getIngredientList.js'
import getMyFavoriteRecipes from "../controller/recipes/getMyFavoriteRecipes.js";
import searchRecipeByKeyword from "../controller/recipes/searchRecipeByKeyword.js";
import setMyFavoriteRecipe from "../controller/recipes/setMyFavoriteRecipe.js";
import subscribeNewsletter from "../controller/recipes/subscribeNewsletter.js";
import unsetMyFavoriteRecipe from "../controller/recipes/unsetMyFavoriteRecipe.js";
import authorization from "../middlewares/jwtMiddleware.js";

const route = express.Router();

// testing route
route.get("/", (req, res) => {
  res.send("Hello World");
});

route.get("/search", authorization, searchRecipeByKeyword);

route.post("/subscribe", authorization, subscribeNewsletter);

route.post("/favorite", authorization, setMyFavoriteRecipe);

route.delete("/favorite", authorization, unsetMyFavoriteRecipe);

route.get("/favorite", authorization, getMyFavoriteRecipes);

route.post("/shopping-list", addIngredientToList);

route.delete("/shopping-list", removeIngredientFromList);

route.get('/shopping-list', getIngredientList)

export default route;
