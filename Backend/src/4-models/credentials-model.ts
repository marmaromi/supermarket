import mongoose from "mongoose";

export interface ICredentialsModel extends mongoose.Document {
    firstName: string;
    lastName: string;
    email: string;
    citizenId: number;
    password: string;
    city: string;
    street: string;
    role: string;
}

export const CredentialsSchema = new mongoose.Schema<ICredentialsModel>({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Missing email"],
        lowercase: true
    },
    citizenId: {
        type: Number,
    },
    password: {
        type: String,
        required: [true, "Missing password"]
    },
    city: {
        type: String,
    },
    street: {
        type: String,
    },
    role: {
        type: String,
    }

}, {
    versionKey: false,
});

export const CredentialsModel = mongoose.model<ICredentialsModel>(
    "CredentialsModel",
    CredentialsSchema,
    "users"
);