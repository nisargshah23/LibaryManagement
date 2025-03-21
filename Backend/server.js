require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: ["https://superlative-kelpie-f3d91c.netlify.app"], 
    credentials: true,  
    methods: ["GET", "POST", "PUT", "DELETE"],  
    allowedHeaders: ["Content-Type", "Authorization"] 
})); 

// MongoDB Connection
mongoose.connect("mongodb+srv://rigrunner23:1234@cluster0.1xtsq.mongodb.net/", {
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


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
