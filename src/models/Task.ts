import { TaskType } from "@/types/task";
import mongoose, { Schema } from "mongoose";

const taskSchema: Schema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    start: { type: Date, required: true },
    end: { type: Date },
    tags: { type: [String] },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id; // Ajouter `id` avec la valeur de `_id`
        delete ret._id; // Supprimer `_id`
        delete ret.__v; // Supprimer `__v`
      },
    },
  },
);

export default mongoose.models.Task ||
  mongoose.model<TaskType>("Task", taskSchema);
