// npm modules
import { Schema, model } from "mongoose";


// ingredients list swagger
/**
 * @openapi
 * components:
 *  schemas:
 *    IngredientsListInput:
 *      type: object
 *      required:
 *        - ttl
 *        - desc
 *      properties:
 *        ttl:
 *          type: string
 *          default: Ingredient Name
 *        desc:
 *          type: string
 *          default: Ingredient description
 *    IngredientsListResponse:
 *      type: object
 *      properties:
 *        ttl:
 *          type: string
 *        desc:
 *          type: string
 */


// Get Recipes By Ingredient swagger
/**
 * @openapi
 * components:
 *  schemas:
 *    GetRecipesByIngredientInput:
 *      type: object
 *      required:
 *        - ttl
 *        - desc
 *      properties:
 *        ttl:
 *          type: string
 *          default: Ingredient Name
 *        desc:
 *          type: string
 *          default: Ingredient description
 *    GetRecipesByIngredientResponse:
 *      type: object
 *      properties:
 *        ttl:
 *          type: string
 *        desc:
 *          type: string
 */

const ingredientSchema = new Schema({
    ttl: {
        type: String,
        required: [true, 'Ingredient title is required'],
      },
      desc: {
        type: String,
        required: [true, 'Ingredient description is required'],
      },
      t: {
        type: String,
      },
      thb: {
        type: String,
      }
});

const Ingredient = model('ingredient', ingredientSchema, 'ingredients');

export default Ingredient;
