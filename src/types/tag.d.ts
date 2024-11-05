import { Types } from "mongoose";

export type TagType = {
  _id: Types.ObjectId;
  id?: string;
  name: string;
  bgColor: string;
  textColor: string;
};
