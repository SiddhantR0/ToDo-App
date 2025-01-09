// Select DOM elements
const taskNameInput = document.getElementById("task-name");
const addTaskButton = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// Function to create a new task
function createTask(taskName) {
    const li = document.createElement("li");

    // Task name text
    const taskText = document.createElement("span");
    taskText.textContent = taskName;
    li.appendChild(taskText);

    // Complete button
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";
    completeBtn.addEventListener("click", () => toggleComplete(taskText));
    li.appendChild(completeBtn);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(li));
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}

// Function to toggle task completion
function toggleComplete(taskText) {
    taskText.parentElement.classList.toggle("completed");
}

// Function to delete a task
function deleteTask(task) {
    task.remove();
}

// Event listener for adding a new task
addTaskButton.addEventListener("click", () => {
    const taskName = taskNameInput.value.trim();
    if (taskName) {
        createTask(taskName);
        taskNameInput.value = "";  // Clear input field
    }
});
