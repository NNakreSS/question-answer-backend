import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  content: {
    type: String,
    required: [true, "Please provide a content"],
    minLength: [10, "Please provide a minimum length (10)"],
  },

  createdAt: {
    typeof: Date,
    default: Date.now,
  },

  author: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User",
  },

  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],

  question: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Question",
  },
});

export default mongoose.model("Answer", AnswerSchema);
