import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
const port = process.env.PORT || 8000;
dotenv.config();
import products from "./model/product";
import multer from "multer";
import path from "path";
const imageUrl = "http://localhost:8000/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    let uniquename = Date.now() + path.extname(file.originalname);
    cb(null, uniquename);
  },
});

const upload = multer({ storage });

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DATABASE_URI, { useUnifiedTopology: true })
  .then(() => {
    console.log("Database connection established");
  })
  .catch((err) => console.error(err));

app.use(express.static("dist"));

app.get("/uploads/:filename", (req, res) => {
  res.sendFile(__dirname + "/uploads/" + req.params.filename);
});

app.get("/products", async (req, res) => {
  try {
    let Product = await products.find();
    res.json(Product);
  } catch (err) {
    if (err) throw err;
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let Product = await products.find({ id });
    res.json(Product);
  } catch (err) {
    if (err) throw err;
  }
});

app.post("/addproduct", upload.single("image"), async (req, res) => {
  let { title, price, description, category } = req.body;
  let image = imageUrl + req.file.path;
  console.log();
  let lastrow = await products
    .find({}, { id: 1, _id: 0 })
    .sort({ id: -1 })
    .limit(1);
  let id = lastrow[0].id + 1;

  let addProduct = {
    id,
    title,
    price,
    description,
    category,
    image,
  };
  await products.create(addProduct);
  res.status(200).json({
    success: true,
    message: "Product added successfully",
  });
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
