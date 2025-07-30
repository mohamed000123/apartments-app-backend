import mongoose, { Schema, Document } from 'mongoose';

export interface ProjectInterface extends Document {
  name: string;
  description: string;
  location: string;
  unitsNumber: number;
  number: string; 
}

const ProjectSchema = new Schema<ProjectInterface>({
  name: { type: String, required: true },
  description: { type: String, required: false },
  location: { type: String, required: true },
  unitsNumber: { type: Number, required: true },
  number: { type: String, unique: true, required: true },
}, { timestamps: true });

const ProjectModel = mongoose.model<ProjectInterface>('Project', ProjectSchema);
export default ProjectModel;
