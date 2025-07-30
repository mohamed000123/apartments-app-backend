import mongoose, { Schema, Document } from "mongoose";

export interface ApartmentInterface extends Document {
  name: string;
  description: string;
  price: number;
  location: string;
  width: number;
  meterPrice: number;
  number: string;
  projectId: mongoose.Types.ObjectId;
}

const ApartmentSchema = new Schema<ApartmentInterface>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: false },
  location: { type: String, required: true },
  width: { type: Number, required: true },
  meterPrice: { type: Number, required: true },
  number: { type: String, unique: true, required: true },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
}, { timestamps: true });

const ApartmentModel = mongoose.model<ApartmentInterface>(
  "Apartment",
  ApartmentSchema
);
export default ApartmentModel;
