import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IMarketData extends Document {
    symbol: string;
    name: string;
    type: 'index' | 'forex' | 'commodity' | 'crypto';
    price: number;
    change: number;
    changePercent: number;
    high24h?: number;
    low24h?: number;
    volume?: number;
    marketCap?: number;
    lastUpdated: Date;
    isActive: boolean;
}

const MarketDataSchema = new Schema<IMarketData>(
    {
        symbol: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        type: { type: String, enum: ['index', 'forex', 'commodity', 'crypto'], required: true },
        price: { type: Number, required: true },
        change: { type: Number, default: 0 },
        changePercent: { type: Number, default: 0 },
        high24h: { type: Number },
        low24h: { type: Number },
        volume: { type: Number },
        marketCap: { type: Number },
        lastUpdated: { type: Date, default: Date.now },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export const MarketData = models.MarketData || model<IMarketData>('MarketData', MarketDataSchema);
