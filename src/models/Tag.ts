import { TagType } from "@/types/tag";
import mongoose, { Schema } from "mongoose";

const TagSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
});

export default mongoose.models.Tag || mongoose.model<TagType>("Tag", TagSchema);
