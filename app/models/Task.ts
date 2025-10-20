import { ProjectStatus } from '@/types/status';
import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface ITask extends Document {
    projectId: Types.ObjectId;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    status: ProjectStatus; // e.g., not_started, in_progress, completed
    assignedTo: string[];
    createdBy: Types.ObjectId;
}

const TaskSchema = new Schema(
    {
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Project'
        },
        name: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        status: { type: String, required: true }, // e.g., not_started, in_progress, completed
        assignedTo: [
            {
                type: String,
                ref: 'User'
            }
        ],
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
const Task: Model<ITask> =
    (mongoose.models && (mongoose.models.Task as Model<ITask>)) ||
    mongoose.model<ITask>('Task', TaskSchema);

export default Task;
