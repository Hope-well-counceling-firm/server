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
    disabled: { type: Boolean, required: true, default: false, select: false },
    deleted: { type: Boolean, required: true, default: false, select: false },
    refreshToken: { type: String, default: null, select: false },
    password: { type: String, required: false, default: null, select: false },
    auth_code: {
      type: Number,
      required: true,
      default: null,
      trim: true,
      select: false,
    },

    // chamas: [
    //   {
    //     chama: { type: mongoose.Schema.Types.ObjectId, ref: "Chama" },
    //     balance: { type: Number, required: true, default: 0 },
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

export const USER_MODEL = mongoose.model("User", userSchema);
