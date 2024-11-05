import { Types } from "mongoose";

export type TaskType = {
  _id: Types.ObjectId;
  id?: string;
  title: string;
  description?: string;
  start: string;
  end?: string;
  tags: string[];
};
