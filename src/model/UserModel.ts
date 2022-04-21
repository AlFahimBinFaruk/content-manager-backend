import { Schema, model, Document } from "mongoose";

//User Interface
export interface UserInterface extends Document {
  username: string;
  email: string;
  password: string;
  loginWithGoogle: boolean;
}

//User Schema
const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    loginWithGoogle: {
      type: Boolean,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

//Export the schema
export default model<UserInterface>("UsersCred", UserSchema);
