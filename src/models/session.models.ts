import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    client_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    councilor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    service_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    status: { type: Boolean, required: true, default: false, select: false },
    date: { type: Date, required: true, default: new Date() },
    amount_paid: { type: Number, trim: true, required: true },
    paymentStatus: { types: Boolean, required: true, default: false },
    location: { type: String, required: true },
    notes: {
      type: Object,
      select: false,
      default: "No previous notes type to update",
    }, // to do later

    held_dates: { type: Array }, // to do
  },
  {
    timestamps: true,
  }
);

export const SESSION_MODEL = mongoose.model("Session", sessionSchema);
