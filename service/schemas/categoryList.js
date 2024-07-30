// npm modules
import { Schema, model } from "mongoose";

const categoryList = new Schema();

const CategoryList = model("ingredient", categoryList);

export default CategoryList;
