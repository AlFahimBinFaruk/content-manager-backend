import { Schema, model, Document,Mongoose } from "mongoose";
import mongoose from "mongoose";
export interface ContentInterface extends Document {
  title: string;
  contentURL: string;
  desc: string;
}

const ContentSchema: Schema = new Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "UsersCred",
    },
    title: {
      type: String,
      required: true,
    },
    contentURL: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export default model<ContentInterface>("ContentsList", ContentSchema);
