const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Task = require('./models/Task');
const Prayer = require('./models/Prayer');

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
}).then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

/* =======================
   ✅ TASK ROUTES
========================== */

// Fetch all tasks
app.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
});

// Create a new task
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

// Delete a task
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


/* =======================
   ✅ PRAYER ROUTES
========================== */

// Get the latest prayer
app.get('/prayer', async (req, res) => {
  try {
    const latestPrayer = await Prayer.findOne().sort({ createdAt: -1 });
    if (!latestPrayer) {
      return res.status(404).json({ error: "No prayer found" });
    }
    res.status(200).json(latestPrayer);
  } catch (error) {
    res.status(500).json({ error: "Error fetching prayer" });
  }
});

// Create a new prayer
app.post('/prayer', async (req, res) => {
  try {
    const { name, day, month, year } = req.body;
    if (!name || day === undefined || month === undefined || year === undefined) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const prayer = new Prayer({ name, day, month, year });
    const savedPrayer = await prayer.save();
    res.status(201).json(savedPrayer);
  } catch (error) {
    res.status(500).json({ error: "Error creating prayer" });
  }
});

// Update the latest prayer by name
app.put('/prayer', async (req, res) => {
  try {
    const { name, day, month, year } = req.body;
    if (!name || day === undefined || month === undefined || year === undefined) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updatedPrayer = await Prayer.findOneAndUpdate(
      { name },
      { $set: { day, month, year } },
      { new: true, sort: { createdAt: -1 } }
    );

    if (!updatedPrayer) {
      return res.status(404).json({ error: "Prayer not found to update" });
    }

    res.status(200).json(updatedPrayer);
  } catch (error) {
    res.status(500).json({ error: "Error updating prayer" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});