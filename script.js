document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage on page load
    loadTasks();

    // Function to add a task
    function addTask(save = true) {
    // Step 1: Retrieve and trim input
    const taskText = taskInput.value.trim();

    // Step 2: Validate input
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // Step 3: Create task item
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;

    // Step 4: Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add = 'remove-btn';

    // Step 5: Handle remove logic
    removeBtn.onclick = function () {
        taskList.removeChild(taskItem);
        removeTaskFromLocalStorage(taskText);
    };

    taskItem.appendChild(removeBtn);
    taskList.appendChild(taskItem);

    // Step 6: Save to local storage
    if (save) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Step 7: Clear input
    taskInput.value = '';
}

    // Function to remove a task from Local Storage
    function removeTaskFromLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Add task on button click
    addButton.addEventListener('click', function () {
        addTask(taskInput.value);
    });

    // Add task on pressing Enter
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });
});

