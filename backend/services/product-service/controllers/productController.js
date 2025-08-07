const Product = require("../models/Product");
const fetchProducts = require("../services/fetchProducts");

exports.ingestProducts = async (req, res) => {
  try {
    await fetchProducts();
    return res.status(200).json({
      success: true,
      message: "Products ingested successfully",
    });
  } catch (err) {
    console.error("Ingestion error:", err);
    return res.status(500).json({
      success: false,
      message: "Ingestion failed due to server error",
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      result: products,
    });
  } catch (err) {
    console.error("Fetch error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products due to server error",
    });
  }
};
