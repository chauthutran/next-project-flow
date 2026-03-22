import mongoose, { Model, Schema, Document } from "mongoose";

export interface IUser extends Document {
    email: string,
    password: string,
    role: string,
    teamMembers: string[];
}

const UserSchema = new Schema<IUser>(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, required: true }, // e.g., project_manager, team_member, viewer
        teamMembers: [{
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'User'
        }]
    },
    {
        timestamps: true,
    }
)

const User: Model<IUser> =
  (mongoose.models && (mongoose.models.User as Model<IUser>)) ||
  mongoose.model<IUser>("User", UserSchema);

export default User;