// npm modules
import express from "express";

//my modules
import authorization from "../middlewares/jwtMiddleware.js";
import addMyRecipe from "../controller/recipes/addMyRecipe.js";
import deleteMyRecipe from "../controller/recipes/deleteMyRecipe.js";
import getOwnRecipes from "../controller/recipes/getMyRecipes.js";
import upload from "../middlewares/multerMiddleware.js";

const route = express.Router();

route.use(authorization);

route.post("/add", upload.single("thumb"), addMyRecipe);
route.delete("/:id", deleteMyRecipe);
route.get("/", getOwnRecipes);

export default route;
