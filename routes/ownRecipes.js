// npm modules
import express from "express";

//my modules
import addMyRecipe from "../controller/recipes/addMyRecipe.js";
import deleteMyRecipe from "../controller/recipes/deleteMyRecipe.js";
import getOwnRecipes from "../controller/recipes/getMyRecipes.js";
import authorization from "../middlewares/jwtMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

const route = express.Router();

route.post("/add", authorization, upload.single("thumb"), addMyRecipe);
route.delete("/:id", authorization, deleteMyRecipe);
route.get("/", authorization, getOwnRecipes);

export default route;
