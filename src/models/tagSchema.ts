import { TagType } from "@/types/tag";
import mongoose, { Schema } from "mongoose";

const tagSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    bgColor: { type: String, required: true },
    textColor: { type: String, required: true },
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

export default mongoose.models.Tag || mongoose.model<TagType>("Tag", tagSchema);
