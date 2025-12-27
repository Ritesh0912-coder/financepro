import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface INews extends Document {
    title: string;
    slug: string;
    content: string;
    summary?: string;
    source: string;
    sourceUrl?: string;
    imageUrl?: string;
    category: string;
    tags: string[];
    author?: string;
    publishedAt: Date;
    isBreaking: boolean;
    isFeatured: boolean;
    views: number;
    status: 'published' | 'draft' | 'archived'; // Added status
    createdAt: Date;
    updatedAt: Date;
}

const NewsSchema = new Schema<INews>(
    {
        title: { type: String, required: true, index: true },
        slug: { type: String, required: true, unique: true },
        content: { type: String, required: true },
        summary: { type: String },
        source: { type: String, required: true },
        sourceUrl: { type: String },
        imageUrl: { type: String },
        category: { type: String, required: true, index: true },
        tags: [{ type: String }],
        author: { type: String },
        publishedAt: { type: Date, default: Date.now, index: true },
        isBreaking: { type: Boolean, default: false },
        isFeatured: { type: Boolean, default: false },
        views: { type: Number, default: 0 },
        status: { type: String, enum: ['published', 'draft', 'archived'], default: 'published' },
    },
    { timestamps: true }
);

NewsSchema.index({ title: 'text', content: 'text' });

export const News = models.News || model<INews>('News', NewsSchema);
