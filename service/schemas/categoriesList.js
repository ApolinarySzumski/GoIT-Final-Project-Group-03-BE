// npm modules
import { Schema, model } from "mongoose";

const categoriesSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
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

const Category = model('category', categoriesSchema, 'categoriesList');

export default Category;
