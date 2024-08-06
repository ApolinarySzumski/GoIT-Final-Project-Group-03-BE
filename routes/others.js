// npm modules
import express from "express";
import authorization from "../middlewares/jwtMiddleware.js";

// my modules
import subscribeNewsletter from "../controller/others.js";
import addToFavorites from '../controller/favorites/addToFavorites.js'
import removeFromFavorites from '../controller/favorites/removeFromFavorites.js'
import getFavoriteRecipes from '../controller/favorites/getFavoriteRecipes.js'

const route = express.Router();

// testing route
route.get("/", (req, res) => {
  res.send("Hello World");
});

route.post("/subscribe", authorization, subscribeNewsletter);

route.post('/favorite', authorization, addToFavorites);

route.delete('/favorite', authorization, removeFromFavorites);

route.get('/favorite', authorization, getFavoriteRecipes)

export default route;
