// npm modules
import { Schema, model } from "mongoose";

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
