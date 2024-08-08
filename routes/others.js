// npm modules
import express from "express";

// my modules
import addIngredientToList from "../controller/recipes/addToShoppingList.js"; // new
import removeIngredientFromList from "../controller/recipes/deleteFromShoppingList.js"; // new
import getMyFavoriteRecipes from "../controller/recipes/getMyFavoriteRecipes.js";
import getIngredientList from "../controller/recipes/getShoppingList.js"; // new
import searchRecipeByKeyword from "../controller/recipes/searchRecipeByKeyword.js";
import setMyFavoriteRecipe from "../controller/recipes/setMyFavoriteRecipe.js";
import subscribeNewsletter from "../controller/recipes/subscribeNewsletter.js";
import unsetMyFavoriteRecipe from "../controller/recipes/unsetMyFavoriteRecipe.js";
import getPopularRecipes from "../controller/recipes/getPopularRecipes.js"; // new
import authorization from "../middlewares/jwtMiddleware.js";

const route = express.Router();

/**
 * @openapi
 * '/subscribe':
 *  post:
 *   tags:
 *   - User
 *   summary: Subscribe
 *   responses:
 *      200:
 *        description: Success, Email sent successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SubscribeResponse'
 *      400:
 *        description: Wrong email or you already subscribe to our newsletter
 *      500:
 *        description: Could not send email
 */
route.post("/subscribe", authorization, subscribeNewsletter);

/**
 * @openapi
 * '/search':
 *  get:
 *   tags:
 *   - Search
 *   summary: Search
 *   responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SearchResponse'
 *      400:
 *        description: Keyword is required
 *      404:
 *        description: No recipes found
 */
route.get("/search", authorization, searchRecipeByKeyword);

/**
 * @openapi
 * '/favorite':
 *  post:
 *   tags:
 *   - Favorite
 *   summary: Favorite
 *   responses:
 *      200:
 *        description: Success, Recipe added to favorites
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RecipeResponse'
 *      400:
 *        description: Recipe ID is required
 *      404:
 *        description: Recipe not found or Recipe is already in favorites
 */
route.post("/favorite", authorization, setMyFavoriteRecipe);

/**
 * @openapi
 * '/favorite':
 *  delete:
 *   tags:
 *   - Favorite
 *   summary: Favorite
 *   responses:
 *      200:
 *        description: Success, Recipe removed from favorites
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RecipeResponse'
 *      400:
 *        description: Recipe ID is required or Recipe is not in favorites
 *      404:
 *        description: Recipe not found
 */
route.delete("/favorite", authorization, unsetMyFavoriteRecipe);

/**
 * @openapi
 * '/favorite':
 *  get:
 *   tags:
 *   - Favorite
 *   summary: Favorite
 *   responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RecipeResponse'
 *      404:
 *        description: No favorite recipes found
 */
route.get("/favorite", authorization, getMyFavoriteRecipes);

/**
 * @openapi
 * '/shopping-list':
 *  post:
 *   tags:
 *   - Shopping list
 *   summary: Add Ingredient To List
 *   responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/IngredientResponse'
 *      404:
 *        description: Ingredient not found
 */
route.post("/shopping-list", authorization, addIngredientToList);

/**
 * @openapi
 * '/shopping-list':
 *  delete:
 *   tags:
 *   - Shopping list
 *   summary: Remove Ingredient From List
 *   responses:
 *      200:
 *        description: Success, Ingredient removed from shopping list
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/IngredientResponse'
 *      400:
 *        description: Ingredient ID is required
 *      404:
 *        description: Ingredient not found in your shopping list
 */
route.delete("/shopping-list", authorization, removeIngredientFromList);

route.get("/shopping-list", authorization, getIngredientList);

route.get("/popular-recipe", authorization, getPopularRecipes);

export default route;
