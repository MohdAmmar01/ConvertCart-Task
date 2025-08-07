const Product = require("../models/Product");
const parseRules = require("../utils/parser");

exports.evaluateSegments = async (req, res) => {
  try {
    const { rules } = req.body;
    if (!Array.isArray(rules) || rules.length === 0) {
      return res.status(200).json({
        success: false,
        message: "Rules must be a non-empty array",
      });
    }

    const filters = parseRules(rules);
    if (!filters || Object.keys(filters).length === 0) {
      return res.status(200).json({
        success: false,
        message: "No valid filters could be parsed from the rules",
      });
    }
    const matched = await Product.find(filters);
    return res.status(200).json({
      success: true,
      message: "Segment evaluation successful",
      result: matched,
    });

  } catch (err) {
    console.error("Evaluation error:", err);
    return res.status(500).json({
      success: false,
      message: "Segment evaluation failed due to server error",
    });
  }
};
