import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IGlobalIndicator extends Document {
    country: string;
    countryCode: string;
    indicatorType: 'inflation' | 'gdp' | 'interest_rate' | 'unemployment' | 'recession_probability';
    value: number;
    previousValue?: number;
    change?: number;
    unit: string;
    period: string;
    source?: string;
    lastUpdated: Date;
    alertLevel?: 'normal' | 'warning' | 'critical';
}

const GlobalIndicatorSchema = new Schema<IGlobalIndicator>(
    {
        country: { type: String, required: true },
        countryCode: { type: String, required: true },
        indicatorType: {
            type: String,
            enum: ['inflation', 'gdp', 'interest_rate', 'unemployment', 'recession_probability'],
            required: true,
        },
        value: { type: Number, required: true },
        previousValue: { type: Number },
        change: { type: Number },
        unit: { type: String, required: true },
        period: { type: String, required: true },
        source: { type: String },
        lastUpdated: { type: Date, default: Date.now },
        alertLevel: { type: String, enum: ['normal', 'warning', 'critical'], default: 'normal' },
    },
    { timestamps: true }
);

GlobalIndicatorSchema.index({ country: 1, indicatorType: 1 });

export const GlobalIndicator = models.GlobalIndicator || model<IGlobalIndicator>('GlobalIndicator', GlobalIndicatorSchema);
