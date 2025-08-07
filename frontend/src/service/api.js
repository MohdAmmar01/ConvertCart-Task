import axios from 'axios';
import { toast } from 'react-toastify';

const PRODUCT_API_BASE = process.env.REACT_APP_PRODUCT_API_BASE_URL;
const SEGMENT_API_BASE = process.env.REACT_APP_SEGMENT_API_BASE_URL;

export const ingestProducts = async () => {
  try {
    const res = await axios.get(`${PRODUCT_API_BASE}/products/ingest`);

    if (res.data.success) {
      toast.success(" Products ingested successfully");
      return res.data;
    } else {
      toast.error("Ingestion failed: " + (res.data.message || "Unknown error"));
      return null;
    }
  } catch (err) {
    console.error("Ingest error:", err);
    toast.error("Failed to ingest products");
    throw err;
  }
};

export const getAllProducts = async () => {
  try {
    const res = await axios.get(`${PRODUCT_API_BASE}/products`);

    if (res.data.success) {
      return res.data.result;
    } else {
      toast.error(" Failed to fetch products: " + (res.data.message || "Unknown error"));
      return [];
    }
  } catch (err) {
    console.error("Fetch products error:", err);
    toast.error(" Server error while fetching products");
    throw err;
  }
};

export const evaluateSegment = async (rules) => {
  try {
    if (!Array.isArray(rules) || rules.length === 0) {
      toast.error(" Please provide at least one valid rule");
      return [];
    }

    const res = await axios.post(`${SEGMENT_API_BASE}/segments/evaluate`, { rules });

    if (res.data.success) {
      const products = res.data.result || [];

      if (products.length === 0) {
        toast.info("No matching products found for the given segment.");
      } else {
        toast.success(`Segment matched ${products.length} products`);
      }

      return products;
    } else {
      toast.error("Segment evaluation failed: " + (res.data.message || "Unknown error"));
      return [];
    }

  } catch (err) {
    console.error("Segment evaluation error:", err);
    toast.error("Server error during segment evaluation");
    throw err;
  }
};
