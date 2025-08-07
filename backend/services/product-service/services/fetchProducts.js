const axios = require("axios");
const Product = require("../models/Product");

const fetchProducts = async () => {
  const { WOO_BASE_URL, WOO_CONSUMER_KEY, WOO_CONSUMER_SECRET } = process.env;
  const url = `${WOO_BASE_URL}/wp-json/wc/v3/products?consumer_key=${WOO_CONSUMER_KEY}&consumer_secret=${WOO_CONSUMER_SECRET}`;

  const res = await axios.get(url);
  const data = res.data;

  const products = data.map(prod => ({
    id: prod.id,
    title: prod.name,
    price: Number(prod.price),
    stock_status: prod.stock_status,
    stock_quantity: prod.stock_quantity,
    category: prod.categories[0]?.name || "Uncategorized",
    tags: prod.tags.map(t => t.name),
    on_sale: prod.on_sale,
    created_at: prod.date_created
  }));
  await Product.deleteMany();
  await Product.insertMany(products);
};

module.exports = fetchProducts;
