// npm modules
import { Schema, model } from "mongoose";

const recipe = new Schema();

const Recipe = model("ingredient", recipe);

export default Recipe;
