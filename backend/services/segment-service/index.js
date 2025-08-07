const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const segmentRoutes = require("./routes/segmentRoutes");

const app = express();
app.use(cors({ origin: process.env.REACT_URL }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.get('/', (req, res) => {
  res.json({ success: true, message: "Api is working !" })
})
app.use("/segments", segmentRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Segment service running on port ${PORT}`));
