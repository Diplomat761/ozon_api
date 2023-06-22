import express from "express";
import axios from "axios";
import mongoose from "mongoose";
import router from "./routes/routes.js";

const app = express();

app.use(express.json());
app.use("/api", router);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
