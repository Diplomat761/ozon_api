const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
});

const Product = mongoose.model("Product", productSchema);

const app = express();

app.use(express.json());

// Получение данных с Ozon при помощи API
app.get("/products", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api-seller.ozon.ru/v1/product/list",
      {
        headers: {
          "Client-Id": "Client-Id",
          "Api-Key": "Api-Key",
        },
      }
    );

    const products = response.data.result.items;

    for (const product of products) {
      const newProduct = new Product({
        title: product.title,
        price: product.price,
        description: product.description,
      });
      await newProduct.save();
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
