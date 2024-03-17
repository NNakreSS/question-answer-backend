import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a username"],
  },

  email: {
    type: String,
    required: [true, "Please provide a email address"],
    unique: [true, "Please try different email addresses"],
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

//? User Schema Methods
// create jwt token
UserSchema.methods.generateJwtFromUser = function () {
  const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;
  const payload = {
    id: this._id,
    name: this.name,
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRE });
  return token;
};

//? pre hooks
UserSchema.pre("save", function (next) {
  // password is not changed
  if (!this.isModified("password")) next();

  //? password hash
  bcrypt.genSalt(10, (err, salt) => {
    if (err) next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) next(err);
      this.password = hash;
      next();
    });
  });
});

export default mongoose.model("User", UserSchema);
