import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    id: { type: Number, required: true },
    title: { type: String, required: true },
    price: { type: String, required: true },
    description: {
      type: String,
      required: true,
    },
    category: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamp: true }
);

export default mongoose.model("product", productSchema);
