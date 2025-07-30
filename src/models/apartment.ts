import mongoose, { Schema, Document } from 'mongoose';

export interface ApartmentInterface extends Document {
  title: string;
  description: string;
  price: number;
  location: string;
  width: number;
  meterPrice: number;
}

const ApartmentSchema = new Schema<ApartmentInterface>({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  width: { type: Number, required: true },
  meterPrice: { type: Number, required: true },
});

const ApartmentModel = mongoose.model<ApartmentInterface>('Apartment', ApartmentSchema);
export default ApartmentModel;
