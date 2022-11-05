import mongoose from "mongoose";

const serviceModels = new mongoose.Schema(
  {
    packageName: { type: String, unique: true, require: true },

    price: { type: Number, trim: true, require: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const SERVICE_MODEL = mongoose.model("Service", serviceModels);
