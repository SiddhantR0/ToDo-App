document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-name');

    // Fetch existing tasks from server
    fetch('/tasks')
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(task => {
                addTaskToList(task);
            });
        });

    // Add new task
    addTaskBtn.addEventListener('click', () => {
        const taskName = taskInput.value.trim();
        if (!taskName) return;

        fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: taskName })
        })
        .then(response => response.json())
        .then(task => {
            addTaskToList(task);
            taskInput.value = '';
        });
    });

    // Add task to the task list
    function addTaskToList(task) {
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);
        li.classList.toggle('completed', task.completed);
        li.innerHTML = `
            <span>${task.name}</span>
            <div class="task-icons">
                <span class="check-btn" onclick="toggleCompletion(${task.id})">&#x2714;</span>
                <span class="delete-btn" onclick="deleteTask(${task.id})">&#10006;</span>
            </div>
        `;
        taskList.appendChild(li);
    }

    // Toggle task completion
    window.toggleCompletion = function(taskId) {
        fetch(`/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: true })
        })
        .then(() => {
            const taskItem = document.querySelector(`[data-id="${taskId}"]`);
            taskItem.classList.toggle('completed');
        })
        .catch(() => {
            alert('Error toggling task completion');
        });
    };

    // Delete task
    window.deleteTask = function(taskId) {
        fetch(`/tasks/${taskId}`, {
            method: 'DELETE'
        })
        .then(() => {
            const taskItem = document.querySelector(`[data-id="${taskId}"]`);
            taskItem.remove();
        })
        .catch(() => {
            alert('Error deleting task');
        });
    };
});
