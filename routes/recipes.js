// npm modules
import express from "express";
import getCategoryNames from "../controller/recipes/getCategoryNames.js";
import getRecipeById from "../controller/recipes/getRecipeById.js";
import getRecipes from "../controller/recipes/getRecipes.js";
import getRecipesByCategory from "../controller/recipes/getRecipesByCategory.js";
import authorization from "../middlewares/jwtMiddleware.js";

// my modules

const route = express.Router();

/**
 * @openapi
 * '/recipes/category-list':
 *  get:
 *   tags:
 *   - Recipes
 *   summary: Categories List
 *   responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CategoriesListResponse'
 *      400:
 *        description: Bad request
 */

route.get("/category-list", authorization, getCategoryNames);


/**
 * @openapi
 * '/recipes/main-page':
 *  get:
 *   tags:
 *   - Recipes
 *   summary: Get Recipes
 *   responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CategoriesListResponse'
 *      400:
 *        description: Bad request
 */
route.get("/main-page", authorization, getRecipes);

/**
 * @openapi
 * '/recipes/category/:category':
 *  get:
 *   tags:
 *   - Recipes
 *   summary: Get Recipes By Category
 *   responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CategoriesListResponse'
 *      400:
 *        description: Bad request
 *      404:
 *        description: No recipes found for ${category} category
 */
route.get("/category/:category", authorization, getRecipesByCategory);


/**
 * @openapi
 * '/recipes/:id':
 *  get:
 *   tags:
 *   - Recipes
 *   summary: Get Recipes By Id
 *   responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CategoriesListResponse'
 *      400:
 *        description: Bad request
 *      404:
 *        description: Recipe not found
 */
route.get("/:id", authorization, getRecipeById);

export default route;
