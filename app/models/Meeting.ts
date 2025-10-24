import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface IMeeting extends Document {
    projectId: Types.ObjectId;
    name: string;
    description: string;
    date: Date;
    participants: string[];
    meetingNotes?: string;
    assignedTo: string[];
    createdBy: Types.ObjectId;
}

const MeetingSchema = new Schema<IMeeting>(
    {
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Project'
        },
        name: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        date: { type: Date, required: true },
        participants: [
            {
                type: String,
                required: true
            }
        ],
        meetingNotes: { type: String, required: false },
        assignedTo: [
            {
                type: String,
                required: true
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
const Meeting: Model<IMeeting> =
    (mongoose.models && (mongoose.models.Meeting as Model<IMeeting>)) ||
    mongoose.model<IMeeting>('Meeting', MeetingSchema);

export default Meeting;
