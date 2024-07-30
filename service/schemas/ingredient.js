// npm modules
import { Schema, model } from "mongoose";

const ingredient = new Schema();

const Ingredient = model("ingredient", ingredient);

export default Ingredient;
