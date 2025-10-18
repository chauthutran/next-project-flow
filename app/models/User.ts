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
            type: String,
            unique: true
        }]
    },
    {
        timestamps: true,
    }
)
// const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
const User: Model<IUser> =
  (mongoose.models && (mongoose.models.User as Model<IUser>)) ||
  mongoose.model<IUser>("User", UserSchema);

export default User;