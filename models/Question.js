import mongoose from "mongoose";

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
    minLength: [10, "Please provide a minimum length (10)"],
    unique: true,
  },

  content: {
    type: String,
    required: [true, "Please provide a content"],
    minLength: [20, "Please provide a minimum length (20)"],
  },

  slug: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },

  author: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User",
  },
});

export default mongoose.model("Question", QuestionSchema);
