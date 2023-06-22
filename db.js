import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
});

export const Product = mongoose.model("Product", productSchema);
