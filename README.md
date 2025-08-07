# 🧠 ConvertCart WooCommerce Segmenter Task

A full-stack application for ingesting WooCommerce products and segmenting them based on custom rules.

---

## 🔗 Live Deployments

- **Frontend (React)**: [https://convertcart-product-segmentation-task.onrender.com](https://convertcart-product-segmentation-task.onrender.com)
- **Product Service (Node.js)**: [https://convertcart-product-segmentation-task-lx2v.onrender.com](https://convertcart-product-segmentation-task-lx2v.onrender.com)
- **Segment Service (Node.js)**: [https://convertcart-product-segmentation-task-8uo6.onrender.com](https://convertcart-product-segmentation-task-8uo6.onrender.com)

## 📁 Project Structure
```bash 
root/
│
├── frontend/                 
├── backend/
│   └── services/
│       ├── product-service/  
│       └── segment-service/  

```
## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/MohdAmmar01/ConvertCart-Task.git
cd ConvertCart-Task
```

### 2. Start Product Service
```bash
cd backend/services/product-service
npm install
cp .env.example .env
npm start
```

### 3. Start Segment  Service
```bash
cd backend/services/segment-service
npm install
cp .env.example .env
npm start
```
### 4. Start Frontend
```bash
cd frontend
npm install
cp .env.local.example .env.local
npm start
```

---

### 5. Configure Environment Variables
Update the environment variable files (.env and .env.local) with the correct values. Refer to the provided .env.example files in each service directory for guidance.

# 📦 Product Ingestion Logic
The Product Service is responsible for fetching product data from a WooCommerce store and storing it in a MongoDB database.

🔄 Ingestion Workflow
### 1.Sends a GET request to the WooCommerce REST API.
### 2 Parses and normalizes the response into a consistent format.
### 3 Inserts or updates each product in the MongoDB database.



# 🧠 Segmentation Logic & Sample Input
The Segment Service transforms rule-based conditions from the frontend into MongoDB queries to filter products accordingly.

### 📝 Sample Input from Frontend
```bash
[
"price > 50",
"stock_status = instock"
"on_sale = true"
]
```
### 🧮 Converted MongoDB Query
```bash 
{ price: { '$gt': 50 }, stock_status: 'instock', on_sale: true }
```
