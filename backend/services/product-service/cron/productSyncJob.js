const cron = require("node-cron");
const fetchProducts = require("../services/fetchProducts");

module.exports = function startProductSyncJob() {
  // cron job to ingest products every 6 hours
  cron.schedule('0 */6 * * *', async () => {
    try {
      await fetchProducts();
    } catch (err) {
      console.error("Cron job failed:", err.message);
    }
  });
};
