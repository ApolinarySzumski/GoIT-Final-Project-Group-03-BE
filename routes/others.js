// npm modules
import express from "express";
import authorization from "../middlewares/jwtMiddleware.js";

// my modules
import subscribeNewsletter from "../controller/others.js";
import addToFavorites from '../controller/favorites/addToFavorites.js'
import removeFromFavorites from '../controller/favorites/removeFromFavorites.js'
import getFavoriteRecipes from '../controller/favorites/getFavoriteRecipes.js'
import addIngredientToList from '../controller/shopping-list/addIngredientToList.js'
// import removeIngredientFromList from '../controller/shopping-list/removeIngredientFromList.js'
// import getIngredientList from '../controller/shopping-list/getIngredientList.js'

const route = express.Router();

route.use(authorization);

// testing route
route.get("/", (req, res) => {
  res.send("Hello World");
});

route.post("/subscribe", subscribeNewsletter);

route.post('/favorite', addToFavorites);

route.delete('/favorite', removeFromFavorites);

route.get('/favorite', getFavoriteRecipes)

route.post("/shopping-list", addIngredientToList);

// route.delete("/shopping-list", removeIngredientFromList);

// route.get('/shopping-list', getIngredientList)

export default route;
