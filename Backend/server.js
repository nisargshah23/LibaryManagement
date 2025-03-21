require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");

if (!process.env.MONGO_URI) {
    console.error("Missing MONGO_URI in environment variables");
    process.exit(1);
}

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || ["https://libary-management-wjnh.vercel.app"],
    credentials: true
}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => {
      console.error(" MongoDB Error:", err);
      process.exit(1);
  });

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// Global Error Handling
app.use((err, req, res, next) => {
    console.error(" Server Error:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
});

// Graceful Shutdown
process.on("SIGINT", async () => {
    console.log("Closing MongoDB Connection...");
    await mongoose.connection.close();
    process.exit(0);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
