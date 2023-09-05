// JavaScript code to manage tasks
const taskList = document.getElementById("task-list");
const taskIdInput = document.getElementById("task-id");
const taskNameInput = document.getElementById("task-name");
const startDateInput = document.getElementById("start-date");
const endDateInput = document.getElementById("end-date");
const statusInput = document.getElementById("status");
const addTaskButton = document.getElementById("add-task-button");

// Array to store tasks
const tasks = [];

function createTaskElement(task) {
    const taskElement = document.createElement("div");
    taskElement.className = "task";

    const taskNameElement = document.createElement("span");
    taskNameElement.textContent = task.taskName;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => editTask(task.id));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    const addSubtaskButton = document.createElement("button");
    addSubtaskButton.textContent = "Add Subtask";
    addSubtaskButton.addEventListener("click", () => addSubtask(task.id));

    taskElement.appendChild(taskNameElement);
    taskElement.appendChild(editButton);
    taskElement.appendChild(deleteButton);
    taskElement.appendChild(addSubtaskButton);

    return taskElement;
}

function updateStatusOptions() {
    const startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);
    const currentDate = new Date();

    // Clear existing options
    while (statusInput.options.length > 0) {
        statusInput.remove(0);
    }

    // Add options based on date comparison
    if (endDate < currentDate) {
        // End date is in the past
        statusInput.add(new Option("Due-Passed", "Due-Passed"));
        statusInput.add(new Option("Completed", "Completed"));
        statusInput.add(new Option("Canceled", "Canceled"));
    } else if (startDate <= currentDate) {
        // Task is in progress or starts today
        statusInput.add(new Option("IN PROGRESS", "IN PROGRESS"));
        statusInput.add(new Option("Completed", "Completed"));
        statusInput.add(new Option("Canceled", "Canceled"));
    } else {
        // Task starts in the future
        statusInput.add(new Option("Not Started", "Not Started"));
        statusInput.add(new Option("Canceled", "Canceled"));
    }
}

function addTask() {
    const id = taskIdInput.value.trim();
    const taskName = taskNameInput.value.trim();
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    const status = statusInput.value;

    // Validation
    if (!id) {
        alert("Task ID is required.");
        return;
    }

    if (!taskName) {
        alert("Task Name is required.");
        return;
    }

    if (!startDate) {
        alert("Start Date is required.");
        return;
    }

    if (!endDate) {
        alert("End Date is required.");
        return;
    }

    if (endDate < startDate) {
        alert("End date must be after the start date.");
        return;
    }

    if (tasks.some(task => task.id === id)) {
        alert("Task ID already exists.");
        return;
    }

    // Create a task object and add it to the tasks array
    const task = {
        id: id,
        taskName: taskName,
        startDate: startDate,
        endDate: endDate,
        status: status,
        subtasks: [] // You can add subtasks here if needed
    };

    tasks.push(task);

    // Create a task element and add it to the task list
    const taskElement = createTaskElement(task);
    taskList.appendChild(taskElement);

    // Clear all input fields
    taskIdInput.value = "";
    taskNameInput.value = "";
    startDateInput.value = "";
    endDateInput.value = "";
    updateStatusOptions(); // Update status options after adding the task
}
//
// function editTask(taskId) {
//     // Implement editing a task here (update the task object and DOM)
// }
//
// function deleteTask(taskId) {
//     // Implement deleting a task here (remove from the array and DOM)
// }
//
// function addSubtask(taskId) {
//     // Implement adding a subtask here (update the task object and DOM)
// }

// Attach the addTask function to the button's click event
addTaskButton.addEventListener("click", addTask);

// Update status options initially and whenever start/end date changes
startDateInput.addEventListener("change", updateStatusOptions);
endDateInput.addEventListener("change", updateStatusOptions);

// Initial status options based on current date
updateStatusOptions();

//add subtask
// Function to add a subtask to a parent task
function addSubtask(parentTaskID, subTaskID, subTaskName, subTaskStartDate, subTaskEndDate, subTaskStatus) {
    // Find the parent task based on its ID
    const parentTask = tasks.find(task => task.id === parentTaskID);

    if (!parentTask) {
        alert('Parent task not found.');
        return;
    }

    const subtask = {
        id: subTaskID,
        subTaskName: subTaskName,
        subTaskStartDate: subTaskStartDate,
        subTaskEndDate: subTaskEndDate,
        subTaskStatus: subTaskStatus,
    };

    parentTask.subtask.push(subtask);

    // Update the table with the added subtask
    updateTaskList();

    // Clear the subtask form
    taskIDInput.value = '';
    taskNameInput.value = '';
    startDateInput.value = '';
    endDateInput.value = '';
    statusSelect.value = '';

    console.log('Subtask added successfully!');
}

// Function to add a subtask to an existing task
function addSubtask() {
    const subtaskName = subtaskNameInput.value.trim();

    if (!subtaskName) {
        alert("Subtask name is required.");
        return;
    }

    // Get the task being edited
    const editedTask = tasks[editedTaskIndex];

    // Create a subtask object
    const subtask = {
        name: subtaskName,
        completed: false
    };

    // Add the subtask to the task's subtasks array
    editedTask.subtasks.push(subtask);

    // Update the subtasks list in the HTML
    updateSubtasksList(editedTaskIndex, editedTask);

    // Clear the subtask name input
    subtaskNameInput.value = "";
}

// Function to update the subtasks list in the HTML
function updateSubtasksList(taskIndex, task) {
    const subtasksList = document.getElementById(`subtasks-list-${task.id}`);

    if (!subtasksList) {
        // If the subtasks list element doesn't exist, create it
        const subtasksListElement = document.createElement("ul");
        subtasksListElement.id = `subtasks-list-${task.id}`;
        taskDetailsDivs[taskIndex].appendChild(subtasksListElement);
    }

    const subtasksListElement = document.getElementById(`subtasks-list-${task.id}`);
    subtasksListElement.innerHTML = ""; // Clear the existing list

    task.subtasks.forEach((subtask, subtaskIndex) => {
        const subtaskItem = document.createElement("li");
        subtaskItem.innerHTML = `
            <input type="checkbox" id="subtask-${task.id}-${subtaskIndex}" ${subtask.completed ? "checked" : ""}>
            <label for="subtask-${task.id}-${subtaskIndex}">${subtask.name}</label>
        `;

        // Add an event listener to toggle subtask completion
        subtaskItem.querySelector("input").addEventListener("change", () => toggleSubtaskCompletion(taskIndex, subtaskIndex));

        subtasksListElement.appendChild(subtaskItem);
    });
}

// Function to toggle subtask completion
function toggleSubtaskCompletion(taskIndex, subtaskIndex) {
    const editedTask = tasks[taskIndex];
    const editedSubtask = editedTask.subtasks[subtaskIndex];
    editedSubtask.completed = !editedSubtask.completed;

    // Update the subtasks list in the HTML
    updateSubtasksList(taskIndex, editedTask);
}

// Attach click event listener to the "Add Subtask" button
addSubtaskButton.addEventListener("click", addSubtask);





// edit task
// Function to edit a task
function editTask(taskId) {
    // Find the task in the tasks array
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        alert("Task not found.");
        return;
    }

    const editedTask = tasks[taskIndex];

    // Populate the edit form with task details
    editTaskIdInput.value = editedTask.id;
    editTaskNameInput.value = editedTask.taskName;
    editStartDateInput.value = editedTask.startDate;
    editEndDateInput.value = editedTask.endDate;
    editStatusInput.value = editedTask.status;

    // Change the button to "Update Task"
    editTaskButton.textContent = "Update Task";

    // Store the index of the task being edited
    editedTaskIndex = taskIndex;

    // Display the edit form
    editTaskForm.style.display = "block";
}

// Function to cancel the edit
function cancelEdit() {
    // Reset the edit form
    editTaskForm.reset();

    // Change the button back to "Edit Task"
    editTaskButton.textContent = "Edit Task";

    // Hide the edit form
    editTaskForm.style.display = "none";

    // Clear the editedTaskIndex
    editedTaskIndex = -1;
}

// Function to update the task with edited details
function updateEditedTask() {
    const editedId = editTaskIdInput.value;
    const editedName = editTaskNameInput.value;
    const editedStartDate = editStartDateInput.value;
    const editedEndDate = editEndDateInput.value;
    const editedStatus = editStatusInput.value;

    // Perform validation checks here

    // Update the task in the tasks array
    const editedTask = tasks[editedTaskIndex];
    editedTask.id = editedId;
    editedTask.taskName = editedName;
    editedTask.startDate = editedStartDate;
    editedTask.endDate = editedEndDate;
    editedTask.status = editedStatus;

    // Update the task in the HTML display
    updateTaskInHTML(editedTaskIndex, editedTask);

    // Reset the edit form
    editTaskForm.reset();

    // Change the button back to "Edit Task"
    editTaskButton.textContent = "Edit Task";

    // Hide the edit form
    editTaskForm.style.display = "none";

    // Clear the editedTaskIndex
    editedTaskIndex = -1;
}

// Attach click event listeners to Edit and Cancel buttons
editTaskButton.addEventListener("click", () => {
    if (editTaskButton.textContent === "Edit Task") {
        editTask(taskToEditId);
    } else {
        updateEditedTask();
    }
});

cancelEditButton.addEventListener("click", cancelEdit);
