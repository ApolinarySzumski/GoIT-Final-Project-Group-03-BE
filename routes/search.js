//npm modules
import express from "express";

//my modules
import authorization from "../middlewares/jwtMiddleware.js";
import searchRecipeByKeyword from "../controller/recipes/searchRecipeByKeyword.js";

const route = express.Router();

route.use(authorization);

route.get("/", searchRecipeByKeyword);

export default route;
