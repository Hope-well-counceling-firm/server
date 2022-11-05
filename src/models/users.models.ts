import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phoneNumber: { type: String, trim: true },
    photo_Url: { type: String },
    status: { type: Boolean, required: true, default: false, select: false },
    bioDetails: { type: String, default: null, select: false },
    password: { type: String, required: false, default: null, select: false },
    role: { type: Number, trim: true, required: true, default: 1 },
    calendar: { type: Object }, // to be updated later
  },
  {
    timestamps: true,
  }
);

export const USER_MODEL = mongoose.model("User", userSchema);
