import mongoose from "mongoose";

export interface ICategoryModel extends mongoose.Document {
    name: string;
}

export const CategorySchema = new mongoose.Schema<ICategoryModel>({
    name: {
        type: String
    }
}, {
    versionKey: false
});

export const CategoryModel = mongoose.model<ICategoryModel>(
    "CategoryModel",
    CategorySchema,
    "categories"
);