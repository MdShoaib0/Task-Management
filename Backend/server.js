const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Import Routes
const taskRoutes = require('./routes/taskRoutes');
const prayerRoutes = require('./routes/prayerRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Debugging: Log MONGO_URL to check if it's loaded
if (!process.env.MONGO_URL) {
  console.error("❌ MONGO_URL is not defined in .env file");
  process.exit(1);
} else {
  console.log("📡 MONGO_URL loaded");
}

// Routes
app.use('/task', taskRoutes);
app.use('/prayer', prayerRoutes);

// Root route
app.get('/', (req, res) => {
  res.send("🚀 Backend is running!");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// MongoDB Connection and Start Server
const startServer = async () => {
  try {
    console.time("⏳ MongoDB Connection Time");
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.timeEnd("⏳ MongoDB Connection Time");
    console.log("✅ MongoDB Connected");

    // Start server only after DB is connected
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1); // Exit process with failure
  }
};

startServer();