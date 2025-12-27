import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IChatSession extends Document {
    userId: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
}

const ChatSessionSchema = new Schema<IChatSession>(
    {
        userId: { type: String, required: true, index: true },
        title: { type: String, default: 'New Chat' },
    },
    { timestamps: true }
);

export const ChatSession = models.ChatSession || model<IChatSession>('ChatSession', ChatSessionSchema);
