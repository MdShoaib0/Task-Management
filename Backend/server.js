const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const Task = require('./models/Task');
const prayerRoutes = require('./routes/prayerRoutes'); // ✅ Import prayer routes

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

/* =========================
   ✅ TASK ROUTES
============================ */
app.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
});

app.post('/', async (req, res) => {
  try {
    const { title, category, description } = req.body;
    if (!title || !category || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const task = new Task({ title, category, description });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: "Error creating task" });
  }
});

app.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted", deletedTask });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
});

/* =========================
   ✅ PRAYER ROUTES
============================ */
app.use('/prayer', prayerRoutes); // ✅ Use route

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});