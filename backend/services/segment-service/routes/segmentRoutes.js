const express = require("express");
const router = express.Router();
const { evaluateSegments } = require("../controllers/segmentController");

router.post("/evaluate", evaluateSegments);

module.exports = router;
