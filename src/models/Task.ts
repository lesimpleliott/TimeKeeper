import { TaskType } from "@/types/task";
import mongoose, { Schema } from "mongoose";

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  start: { type: Date, required: true },
  end: { type: Date },
  tags: [{ type: String }],
});

export default mongoose.models.Task ||
  mongoose.model<TaskType>("Task", TaskSchema);
