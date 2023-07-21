import { IUser } from "@/interfaces";
import { Model, Schema, model, models } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {
    timestamps: true
});

const User: Model<IUser> = models.User || model('User', userSchema);

export default User;