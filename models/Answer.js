import mongoose from "mongoose";
import Question from "./Question.js";

const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  content: {
    type: String,
    required: [true, "Please provide a content"],
    minLength: [10, "Please provide a minimum length (10)"],
  },

  createdAt: {
    type: Date,
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

//? pre hooks
AnswerSchema.pre("save", async function (next) {
  if (!this.isModified("author")) return next();

  try {
    const question = await Question.findById(this.question);
    question.answers.push(this._id);
    question.answerCount = question.answers.length;
    await question.save();
    next();
  } catch (error) {
    return next(error);
  }
});

export default mongoose.model("Answer", AnswerSchema);
