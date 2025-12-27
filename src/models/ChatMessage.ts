import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IChatMessage extends Document {
    userId: string;
    sessionId: string;
    role: 'user' | 'assistant';
    content: string;
    createdAt: Date;
}

const ChatMessageSchema = new Schema<IChatMessage>(
    {
        userId: { type: String, required: true, index: true },
        sessionId: { type: String, required: true, index: true },
        role: { type: String, enum: ['user', 'assistant'], required: true },
        content: { type: String, required: true },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

export const ChatMessage = models.ChatMessage || model<IChatMessage>('ChatMessage', ChatMessageSchema);
