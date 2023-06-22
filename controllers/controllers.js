import axios from "axios";
import { Product } from "../db.js";

class ProductController {
  async AddProductToDB(req, res) {
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
  }

  async createProduct(req, res) {
    const { title, price, description } = req.body;

    try {
      const product = new Product({
        title,
        price,
        description,
      });

      const savedProduct = await product.save();

      res.json(savedProduct);
    } catch (error) {
      console.error("Ошибка создания продукта", error);
      res.status(500).json({ error: "Ошибка создания продукта" });
    }
  }

  async getAllProducts(req, res) {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      console.error("Не удалось поолучить продукт:", error);
      res.status(500).json({ error: "Не удалось поолучить продукт" });
    }
  }

  async getProductById(req, res) {
    const { id } = req.params;

    try {
      const product = await Product.findById(id);

      if (!product) {
        return res.status(404).json({ error: "Продукт не найден" });
      }

      res.json(product);
    } catch (error) {
      console.error("Не удалось поолучить продукт:", error);
      res.status(500).json({ error: "Не удалось поолучить продукт" });
    }
  }

  async updateProduct(req, res) {
    const { id } = req.params;
    const { title, price, description } = req.body;

    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { title, price, description },
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ error: "Продукт не найден" });
      }

      res.json(updatedProduct);
    } catch (error) {
      console.error("Ошибка редактирования продукта:", error);
      res.status(500).json({ error: "Ошибка редактирования продукта" });
    }
  }

  async deleteProduct(req, res) {
    const { id } = req.params;

    try {
      const deletedProduct = await Product.findByIdAndDelete(id);

      if (!deletedProduct) {
        return res.status(404).json({ error: "Продукт не найден" });
      }

      res.json(deletedProduct);
    } catch (error) {
      console.error("Ошибка удаления продукта:", error);
      res.status(500).json({ error: "Ошибка удаления продукта" });
    }
  }
}
export default new ProductController();
