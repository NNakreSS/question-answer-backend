import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a username"],
  },

  email: {
    type: String,
    required: [true, "Please provide a email address"],
    uniqe: [true, "Please try different email addresses"],
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Please provide a valid email address",
    ],
  },

  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [6, "Please provide at least 6 characters"],
    select: false,
  },

  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  title: {
    type: String,
  },

  about: {
    type: String,
  },

  place: {
    type: String,
  },

  website: {
    type: String,
  },

  profile_image: {
    type: String,
    default: "default.webp",
  },

  blocked: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("User", UserSchema);
