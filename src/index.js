const express = require("express");

const app = express();
const inventoryRoutes = require("../routes/inventory");
const connectDB = require("../db/connection");
require("dotenv").config();

//middleware
app.use(express.json());
// routes
app.get("/", (req, res) => {
  res.send(
    "<h1>Inventory Management API</h1><a href='/api/v1/inventory'>Inventory Routes</a>"
  );
});

app.use("/api/v1/inventory", inventoryRoutes);

const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
