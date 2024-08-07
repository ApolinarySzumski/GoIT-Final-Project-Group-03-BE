// npm modules
import { mongoose, Schema, model } from "mongoose";


// Categories List swagger
/**
 * @openapi
 * components:
 *  schemas:
 *    CategoriesListInput:
 *      type: object
 *      required:
 *        - title
 *        - description
 *      properties:
 *        title:
 *          type: string
 *          default: Example Category Name
 *        description:
 *          type: string
 *          default: Example Category Description
 *    CategoriesListResponse:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *        description:
 *          type: string
 */


const categorySchema = new Schema({
  title: {
    type: String,
    required: [true, "Category title is required"],
  },
  thumb: {
    type: String,
  },
  description: {
    type: String,
    required: [true, "Category description is required"],
  },
});

const Category = model("category", categorySchema, "categoriesList");

export default Category;
