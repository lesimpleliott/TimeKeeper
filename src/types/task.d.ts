import { Types } from "mongoose";

export type TaskType = {
  _id: Types.ObjectId;
  title: string;
  description?: string;
  start: Date;
  end?: Date;
  tags: string[];
};
