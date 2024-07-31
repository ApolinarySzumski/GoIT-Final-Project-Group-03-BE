// npm modules
import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    title: {
        type: String,
        required: [true, 'Category title is required']
    },
    thumb: {
        type: String,
    },
    description: {
        type: String,
        required: [true, 'Category description is required']
    },
});

const Category = model('category', categorySchema, 'categoriesList');

export default Category;
