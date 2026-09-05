import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  location: string;
  price: number;
  duration: number;
  difficulty: string;
  rating: number;
  reviewCount: number;
  imageUrls: string[];
  tags: string[];
  requirements: string[];
  bestSeason: string;
  creator: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    difficulty: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    imageUrls: [{ type: String }],
    tags: [{ type: String }],
    requirements: [{ type: String }],
    bestSeason: { type: String },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

ExperienceSchema.index({ title: 'text', location: 'text', category: 'text', tags: 'text' });
ExperienceSchema.index({ price: 1 });
ExperienceSchema.index({ rating: -1 });

export default mongoose.model<IExperience>('Experience', ExperienceSchema);
