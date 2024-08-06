// npm modules
import express from "express";
import authorization from "../middlewares/jwtMiddleware.js";

// my modules
import subscribeNewsletter from "../controller/others.js";
import addToFavorites from '../controller/favorites/addToFavorites.js'
import removeFromFavorites from '../controller/favorites/removeFromFavorites.js'
import getFavoriteRecipes from '../controller/favorites/getFavoriteRecipes.js'

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

export default route;
