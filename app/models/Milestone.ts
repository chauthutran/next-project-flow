import { ProjectStatus } from '@/app/types/status';
import mongoose, { Model, Schema, Types } from 'mongoose';

export interface IMilestone extends Document {
    projectId: Types.ObjectId;
    name: string;
    description: string;
    dueDate: Date;
    status: ProjectStatus; // e.g., not_started, in_progress, completed
    assignedTo: string[];
    createdBy: Types.ObjectId;
}

const MilestoneSchema = new Schema<IMilestone>(
    {
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Project'
        },
        name: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        dueDate: { type: Date, required: true },
        status: { type: String, required: true }, // e.g., pending, achieved, delayed
        assignedTo: [{ type: String, required: true }],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

const Milestone: Model<IMilestone> =
    (mongoose.models && (mongoose.models.Milestone as Model<IMilestone>)) ||
    mongoose.model<IMilestone>('Milestone', MilestoneSchema);

export default Milestone;
