const express = require("express");
const router = express.Router();
const { ingestProducts, getAllProducts } = require("../controllers/productController");

router.get("/ingest", ingestProducts);
router.get("/", getAllProducts);

module.exports = router;
