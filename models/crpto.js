import mongoose, { Schema } from "mongoose";
const crptoSchma = new Schema(
  {
    id: {
      type: Number,
      required:true,
    },
    name: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
    price_usd: {
      type: Number,
      required: true,
    },
    market_cap_usd: {
      type: Number,
      required: true,
    },
    change_24h: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
export const Crpto = mongoose.model("Crpto", crptoSchma);
