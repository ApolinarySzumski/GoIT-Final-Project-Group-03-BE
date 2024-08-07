// npm modules
import express from "express";

//my modules
import addMyRecipe from "../controller/recipes/addMyRecipe.js";
import deleteMyRecipe from "../controller/recipes/deleteMyRecipe.js";
import getMyRecipes from "../controller/recipes/getMyRecipes.js";
import authorization from "../middlewares/jwtMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

const route = express.Router();


/**
 * @openapi
 * '/ownRecipes/add':
 *  post:
 *   tags:
 *   - My Recipe
 *   summary: Add My Recipe
 *   responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RecipeResponse'
 *      400:
 *        description: Invalid ingredients format
 */
route.post("/add", authorization, upload.single("thumb"), addMyRecipe);


/**
 * @openapi
 * '/ownRecipes/:id':
 *  delete:
 *   tags:
 *   - My Recipe
 *   summary: Delete My Recipe
 *   responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RecipeResponse'
 *      404:
 *        description: Bad request
 */
route.delete("/:id", authorization, deleteMyRecipe);


/**
 * @openapi
 * '/ownRecipes':
 *  get:
 *   tags:
 *   - My Recipe
 *   summary: Get My Recipe
 *   responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RecipeResponse'
 *      404:
 *        description: Bad request
 */
route.get("/", authorization, getMyRecipes);


export default route;
