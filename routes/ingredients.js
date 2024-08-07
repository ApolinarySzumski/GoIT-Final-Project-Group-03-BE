// npm modules
import express from "express";

// my modules
import getIngredients from "../controller/recipes/getIngredientNames.js";
import getRecipesByIngredient from "../controller/recipes/getRecipesByIngredientId.js";
import authorization from "../middlewares/jwtMiddleware.js";

const route = express.Router();

route.use(authorization);

/**
 * @openapi
 * '/ingredients/list':
 *  get:
 *   tags:
 *   - Ingredients
 *   summary: Ingredients list
 *   responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/IngredientsListResponse'
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not found any ingredients in database
 */
route.get("/list", getIngredients);


/**
 * @openapi
 * '/ingredients/:ingredient':
 *  get:
 *   tags:
 *   - Ingredients
 *   summary: Get Recipes By Ingredient
 *   responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetRecipesByIngredientResponse'
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not found any ingredients in database
 */
route.get("/:ingredient", getRecipesByIngredient);

export default route;
