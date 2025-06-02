const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const Task = require('./models/Task');

dotenv.config();

const app = express();

// ✅ CORS: Allow only your frontend domain
app.use(cors({
  origin: "https://taskmanager0y.netlify.app/", // 🔁 Replace this with your deployed frontend URL
  credentials: true
}));

app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("✅ Database is now Connected!");

    // Start the server after DB is connected
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 App is listening at PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

// ✅ Keep-alive route for uptime services (like UptimeRobot)
app.get('/ping', (req, res) => {
  res.send('pong');
});

// ✅ Optional: Serve React frontend (if using same server)
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// ✅ Routes

// Fetch all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Create a new task
app.post('/api/tasks', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ error: "Failed to save task" });
  }
});

// Delete a task by ID
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    } else {
      return res.status(200).json({ message: 'Task deleted successfully', deletedTask });
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});
