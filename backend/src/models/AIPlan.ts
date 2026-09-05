import mongoose, { Schema, Document } from 'mongoose';

export interface IAIPlan extends Document {
  user: mongoose.Types.ObjectId;
  destination: string;
  budget: number;
  durationDays: number;
  interests: string[];
  itinerary: any;
  createdAt: Date;
  updatedAt: Date;
}

const AIPlanSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    destination: { type: String, required: true },
    budget: { type: Number, required: true },
    durationDays: { type: Number, required: true },
    interests: [{ type: String }],
    itinerary: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IAIPlan>('AIPlan', AIPlanSchema);
