import mongoose from "mongoose";

export const MessageSchema = new mongoose.Schema({
  id: { type: String, required: true },
  user: {
    type: Object,
    required: true,
  },
  message: { type: String, required: true },
});

export const MessageModel = mongoose.model("messages", MessageSchema);
