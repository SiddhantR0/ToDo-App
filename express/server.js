const express = require('express');
const mysql = require('mysql2');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sid_9847386258@',
    database: 'todo_list'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// Fetch all tasks
app.get('/tasks', (req, res) => {
    const sql = "SELECT * FROM tasks";
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching tasks:', err.message);
            res.status(500).send('Error fetching tasks');
            return;
        }
        res.json(results);
    });
});

// Add a new task
app.post('/tasks', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).send('Task name is required');
    }

    const sql = "INSERT INTO tasks (name, completed) VALUES (?, false)";
    db.query(sql, [name], (err, result) => {
        if (err) {
            console.error('Error adding task:', err.message);
            res.status(500).send('Error adding task');
            return;
        }
        res.status(201).json({ id: result.insertId, name, completed: false });
    });
});

// Update a task (toggle completion or rename)
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    if (completed === undefined) {
        return res.status(400).send('Completed status is required');
    }

    const sql = "UPDATE tasks SET completed = ? WHERE id = ?";
    db.query(sql, [completed, id], (err, result) => {
        if (err) {
            console.error('Error updating task:', err.message);
            res.status(500).send('Error updating task');
            return;
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Task not found');
        }
        res.send('Task updated successfully');
    });
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM tasks WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting task:', err.message);
            res.status(500).send('Error deleting task');
            return;
        }
        res.send('Task deleted successfully');
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
