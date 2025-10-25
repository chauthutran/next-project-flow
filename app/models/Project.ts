import { ProjectStatus, STATUS_KEYS } from '@/app/types/status';
import mongoose, { Document, Model, Schema, Types } from 'mongoose';


export interface IProject extends Document {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    status: ProjectStatus; // In Progress, Not Started, Planning
    managedBy: Types.ObjectId;
    teamMembers: string[];
}

const ProjectSchema = new Schema<IProject>(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        status: { type: String, enum: STATUS_KEYS, required: true },
        managedBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        teamMembers: [
            {
                type: String,
                unique: true,
                required: true,
                ref: 'User'
            }
        ]
    },
    {
        timestamps: true
    }
);
const Project: Model<IProject> =
    (mongoose.models && (mongoose.models.Project as Model<IProject>)) ||
    mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
