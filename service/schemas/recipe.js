// npm modules
import mongoose, { Schema, model } from "mongoose";

// Ingredients - swagger
/**
 * @openapi
 * components:
 *  schemas:
 *    IngredientInput:
 *      type: object
 *      required:
 *        - name
 *        - quantity
 *        - measure
 *      properties:
 *        name:
 *          type: string
 *          default: example Ingredient Name
 *        quantity:
 *          type: number
 *          default: 10
 *        measure:
 *          type: string
 *          default: kg
 *    IngredientResponse:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        quantity:
 *          type: number
 *        measure:
 *          type: string
 */

const ingredientMeasureSchema = new Schema([
  {
    id: {
      type: mongoose.Types.ObjectId,
      ref: "ingredient",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    measure: {
      type: String,
      enum: ["tbp", "tsp", "kg", "g", "ml", "piece"],
      required: true,
    },
  },
]);

// Search - swagger
/**
 * @openapi
 * components:
 *  schemas:
 *    SearchInput:
 *      type: object
 *      required:
 *        - title
 *      properties:
 *        title:
 *          type: string
 *          default: exampleName
 *    SearchResponse:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 */

// Favorite, recipe swagger
/**
 * @openapi
 * components:
 *  schemas:
 *    RecipeInput:
 *      type: object
 *      required:
 *        - title
 *        - category
 *        - instructions
 *        - time
 *        - owner
 *      properties:
 *        title:
 *          type: string
 *          default: example Title
 *        category:
 *          type: string
 *          default: example Category Name
 *        instructions:
 *          type: string
 *          default: example instruction steps
 *        time:
 *          type: number
 *          default: 30
 *        owner:
 *          type: string
 *          default: UserName
 *
 *    RecipeResponse:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *        category:
 *          type: string
 *        instructions:
 *          type: string
 *        time:
 *          type: number
 *        owner:
 *          type: string
 */

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Beef",
        "Breakfast",
        "Chicken",
        "Dessert",
        "Goat",
        "Lamb",
        "Miscellaneous",
        "Pasta",
        "Pork",
        "Seafood",
        "Side",
        "Starter",
        "Vegan",
        "Vegetarian",
      ],
      required: true,
    },
    area: {
      type: String,
    },
    instructions: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    thumb: {
      type: String,
      validate: /^(http|https):\/\/[^\s]+$/,
    },
    preview: {
      type: String,
      validate: /^(http|https):\/\/[^\s]+$/,
    },
    time: {
      type: String,
      required: true,
    },
    favorites: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    youtube: {
      type: String,
      validate: /^(http|https):\/\/[^\s]+$/,
    },
    tags: [
      {
        type: String,
      },
    ],
    ingredients: [ingredientMeasureSchema],
    owner: {
      type: String,
      ref: "User",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Recipe = model("recipe", recipeSchema, "recipes");

export default Recipe;
