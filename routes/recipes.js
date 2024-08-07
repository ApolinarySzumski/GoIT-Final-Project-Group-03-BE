// npm modules
import express from "express";
import authorization from "../middlewares/jwtMiddleware.js";
import getCategoryNames from "../controller/recipes/getCategoryNames.js";
import getRecipes from "../controller/recipes/getRecipes.js";
import getRecipesByCategory from "../controller/recipes/getRecipesByCategory.js";
import getRecipeById from "../controller/recipes/getRecipeById.js";

// my modules

const route = express.Router();

route.use(authorization);


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
route.get("/category-list", getCategoryNames);

//?
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
route.get("/main-page", getRecipes);


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
 */
route.get("/category/:category", getRecipesByCategory);

//?
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
 */
route.get("/:id", getRecipeById);

export default route;
