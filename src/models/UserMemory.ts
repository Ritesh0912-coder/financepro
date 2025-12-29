import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IUserMemory extends Document {
    userId: string;
    memory: string;
    updatedAt: Date;
}

const UserMemorySchema = new Schema<IUserMemory>(
    {
        userId: { type: String, required: true, unique: true, index: true },
        memory: { type: String, default: "" },
    },
    { timestamps: true }
);

export const UserMemory = models.UserMemory || model<IUserMemory>('UserMemory', UserMemorySchema);
