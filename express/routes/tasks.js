const express = require("express");
const router = express.Router();

// GET 
router.get("/", (req, res) => {
    res.json(tasks);
});

// POST 
router.post("/", (req, res) => {
    const { task_name } = req.body;

    if (!task_name) {
        return res.status(400).json({ error: "Task name is required" });
    }

    const newTask = {
        id: tasks.length + 1,
        task_name,
        is_completed: false,
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PUT 
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { is_completed } = req.body;

    const task = tasks.find((task) => task.id === parseInt(id));

    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }

    task.is_completed = is_completed !== undefined ? is_completed : task.is_completed;

    res.json(task);
});

// DELETE 
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));

    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found" });
    }

    const deletedTask = tasks.splice(taskIndex, 1);
    res.json(deletedTask[0]);
});

module.exports = router; 
