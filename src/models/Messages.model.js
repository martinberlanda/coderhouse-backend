import mongoose from "mongoose";

export const MessageSchema = new mongoose.Schema(
  {
    user: {
      type: Object,
      required: true,
    },
    message: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

export const MessageModel = mongoose.model("messages", MessageSchema);
