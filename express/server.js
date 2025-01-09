const express = require("express");
const bodyParser = require("body-parser");
const tasksRoutes = require("./routes/tasks"); 

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/tasks", tasksRoutes);

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
