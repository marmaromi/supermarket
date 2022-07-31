import mongoose from "mongoose";
import isIsraeliIdValid from 'israeli-id-validator';

export interface IUserModel extends mongoose.Document {
    firstName: string;
    lastName: string;
    email: string;
    citizenId: number;
    password: string;
    city: string;
    street: string;
    role: string;
}

export const UserSchema = new mongoose.Schema<IUserModel>({
    firstName: {
        type: String,
        required: [true, "Missing first name"],
        minlength: [2, "First name must be at least 2 characters long"],
        maxlength: [30, "First name must be 30 characters or less"],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "Missing last name"],
        minlength: [2, "Last name must be at least 2 characters long"],
        maxlength: [30, "Last name must be 30 characters or less"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Missing email"],
        trim: true,
        unique: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Invalid email address",
        ]
    },
    citizenId: {
        type: Number,
        required: [true, "Missing citizen id"],
        trim: true,
        unique: true,
        validate: [isIsraeliIdValid, "Invalid citizen id"],
    },
    password: {
        type: String,
        required: [true, "Missing password"],
        minlength: [8, "Password must be at least 8 characters long"],
        maxlength: [128, "Password must be 128 characters or less"]

    },
    city: {
        type: String,
        required: [true, "Missing city"],
        minlength: [2, "City must be at least 2 characters long"],
        maxlength: [50, "City must be 50 characters or less"],
        trim: true,
    },
    street: {
        type: String,
        required: [true, "Missing street"],
        minlength: [2, "Street must be at least 2 characters long"],
        maxlength: [50, "Street must be 50 characters or less"],
        trim: true,
    },
    role: {
        type: String,
    }
}, {
    versionKey: false,
});

export const UserModel = mongoose.model<IUserModel>(
    "UserModel",
    UserSchema,
    "users"
);