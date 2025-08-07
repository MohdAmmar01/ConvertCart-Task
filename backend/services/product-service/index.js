const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const startProductSyncJob = require('./cron/productSyncJob');

const app = express();
app.use(cors({ origin: process.env.REACT_URL }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.get('/', (req, res) => {
  res.json({ success: true, message: "Api is working !" })
})
app.use("/products", productRoutes);


startProductSyncJob()
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Product service running on port ${PORT}`));
