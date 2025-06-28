const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Error fetching tasks" });
    }
});

router.post('/', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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

module.exports = router;