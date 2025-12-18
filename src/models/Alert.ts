import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IAlert extends Document {
    title: string;
    message: string;
    type: 'breaking' | 'warning' | 'info' | 'critical';
    category?: string;
    isActive: boolean;
    expiresAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const AlertSchema = new Schema<IAlert>(
    {
        title: { type: String, required: true },
        message: { type: String, required: true },
        type: { type: String, enum: ['breaking', 'warning', 'info', 'critical'], default: 'info' },
        category: { type: String },
        isActive: { type: Boolean, default: true },
        expiresAt: { type: Date },
    },
    { timestamps: true }
);

export const Alert = models.Alert || model<IAlert>('Alert', AlertSchema);
