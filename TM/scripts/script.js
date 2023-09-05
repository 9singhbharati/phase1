const taskIDInput = document.getElementById('taskID');
const taskNameInput = document.getElementById('taskName');
const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');
const statusSelect = document.getElementById('status');
const parentTaskForm = document.getElementById("parentTaskForm");
const addTaskBtn = document.getElementById('addTaskBtn');
// const taskList = document.getElementById('taskList');
const taskTable = document.getElementById("taskTable");
const tableBody = document.getElementById('tableBody');
const searchTask = document.getElementById('searchTask');
//
// let tasks = [
//     {
//         id: 1,
//         taskName: 'task1',
//         startDate: '2023-09-03T23:08',
//         endDate: '2023-09-05T23:08',
//         status:'In-Progress',
//         subtask:[
//             {
//                 id:1,
//                 subTaskName: "subtask task1",
//                 subTaskStartDate:'2023-09-03T23:08',
//                 subTaskEndDate:'2023-09-05T23:08',
//                 subTaskStatus:'In-Progress',
//             }
//
//         ]
//     }
// ];
//
// //show table data
//
// // function showTable(tasks) {
// //     const tableBody = document.querySelector('#taskTable tbody');
// //     tableBody.innerHTML = ''; // Clear existing rows
// //
// //     tasks.forEach(task => {
// //         const parentRow = document.createElement('tr');
// //         parentRow.innerHTML = `
// //             <td>${task.id}</td>
// //             <td class="parent-task ${task.subtasks && task.subtasks.length > 0 ? 'has-subtasks' : ''}">${task.taskName}</td>
// //             <td>${task.startDate}</td>
// //             <td>${task.endDate}</td>
// //             <td>${task.status}</td>
// //             <td><button class="addSubTask">Add Sub Task</button></td>
// //             <td><button class="editTask">Edit</button></td>
// //             <td><button class="deleteTask">Delete</button></td>
// //         `;
// //         tableBody.appendChild(parentRow);
// //
// //         if (task.subtasks && task.subtasks.length > 0) {
// //             task.subtasks.forEach((subtask, index) => {
// //                 // Generate a unique subtask ID based on the parent task ID and index
// //                 subtask.id = generateSubtaskID(task.id, index + 1);
// //
// //                 const subtaskRow = document.createElement('tr');
// //                 subtaskRow.className = 'subtask-row'; // Hide subtask row by default
// //                 subtaskRow.innerHTML = `
// //                     <td>${subtask.id}</td>
// //                     <td>${subtask.taskName}</td>
// //                     <td>${subtask.startDate}</td>
// //                     <td>${subtask.endDate}</td>
// //                     <td>${subtask.status}</td>
// //                 `;
// //                 tableBody.appendChild(subtaskRow);
// //             });
// //         }
// //
// //         // Add a click event listener to the parent task row to toggle subtask visibility
// //         parentRow.addEventListener('click', (function (row) {
// //             return function () {
// //                 const subtasks = row.nextElementSibling; // Get the next row (subtasks)
// //
// //                 if (subtasks) { // Check if subtasks exists (not null)
// //                     const subtaskRows = document.querySelectorAll('.subtask-row');
// //                     subtaskRows.forEach(subtaskRow => {
// //                         subtaskRow.style.display = 'none';
// //                     });
// //
// //                     subtasks.style.display = subtasks.style.display === 'none' ? 'table-row' : 'none';
// //                 }
// //             };
// //         })(parentRow));
// //     });
// // }
// //
// // // Initial population of the table
// // showTable(tasks);
// //
// // // Function to generate a unique subtask ID
// // function generateSubtaskID(parentID, index) {
// //     return `${parentID}-${index}`;
// // }
//
// function showTable(tasks){
//     taskTable.innerHTML = `<tr>
//                 <td>Task ID</td>
//                 <td>Task Name</td>
//                 <td>Start Date</td>
//                 <td>End Date</td>
//                 <td>Status</td>
//                 <th>Add Sub Task</th>
//                 <th>Edit</th>
//                 <th>Delete</th>
//         </tr>`;
//
//     //if array is empty
//     if(tasks == ''){
//         document.getElementById('error').innerHTML = `<span>Not Found</span>`
//     }else{
//         document.getElementById('error').innerHTML = "";
//
//         for(let i = 0; i < tasks.length; i++){
//             taskTable.innerHTML += `
//                 <td class="data-task-id">${tasks[i].id}</td>
//                 <td>${tasks[i].taskName}</td>
//                 <td>${tasks[i].startDate}</td>
//                 <td>${tasks[i].endDate}</td>
//                 <td>${tasks[i].status}</td>
//                 <td><button class="addSubTask">Add Sub Task</button></td>
//                 <td><button class="editTask">Edit</button></td>
//                 <td><button class="deleteTask">Delete</button></td>`
//         }
//     }
//     console.log("show table is called");
// }
//
// showTable(tasks);
//
//
// // search function
//
// // Function to filter tasks based on user input
// function filterTasks() {
//     const search = document.querySelector('#searchTask').value.toLowerCase();
//
//     const filteredTasks = tasks.filter(obj =>
//         obj.id.toString().includes(search)||
//         obj.taskName.toLowerCase().includes(search) ||
//         obj.startDate.toISOString().slice(0, 10).includes(search) ||
//         obj.endDate.toISOString().slice(0, 10).includes(search) ||
//         obj.status.toLowerCase().includes(search)
//     );
//
//     console.log("this is filtered task")
//     console.log(filteredTasks);
//     showTable(filteredTasks);
// }
//
// // Event listener for the search input
// document.querySelector('#searchTask').addEventListener('input', filterTasks);
//
//
//
//
// // event listner on add task button (Add task functionality)
// const addTask = addTaskBtn.addEventListener('click', () => {
//
//     const taskID = parseInt(taskIDInput.value);
//     const taskName = taskNameInput.value;
//     const startDate = startDateInput.value;
//     const endDate = endDateInput.value;
//     const status = statusSelect.value;
//
//     if (isNaN(taskID)) {
//         alert('Please fill Task ID');
//         return;
//     }else  if (isTaskIDTaken(taskID)) {
//         alert('Task ID is already taken.');
//         return;
//     }
//     else if(taskName.trim() === ''){
//         alert('Please fill Task Name');
//         return;
//     }else if( startDate.toString() === 'Invalid Date' ){
//         alert('Please fill Start Date');
//         return;
//     }else if( endDate.toString() === 'Invalid Date' ){
//         alert('Please fill End Date');
//         return;
//     }
//     else if (endDate < startDate) {
//         alert('End Date should be after the Start Date');
//         return;
//     }
//
//     if (isTaskIDTaken(taskID)) {
//         alert('Task ID is already taken.');
//         return;
//     }
//
//     const task = {
//         id: taskID,
//         taskName: taskName,
//         startDate:startDate,
//         endDate:endDate,
//         status:status,
//         subtask:[]
//     };
//
//     tasks.push(task);
//     updateTaskList();
//     // alert('Task added successfully!');
//     console.log(tasks);
//
//     // Clear the form
//     parentTaskForm.reset();
//
// });
//
//
// // to check if task id is already taken
// function isTaskIDTaken(taskID) {
//     return tasks.some(task => task.id === taskID);
// }
//
//
// // Update task list in html
// function updateTaskList() {
//     const taskID = taskIDInput.value;
//     const taskName= taskNameInput.value;
//     const startDate= startDateInput.value;
//     const endDate = endDateInput.value;
//     const status = statusSelect.value;
//
//     const newRow = createTableRow(taskID,taskName, startDate, endDate, status);
//     taskTable.appendChild(newRow);
// }
//
// // create table in html
// function createTableRow(taskID, taskName, startDate, endDate, status) {
//     const row = document.createElement("tr");
//     row.innerHTML = `
//         <td>${taskID}</td>
//         <td>${taskName}</td>
//         <td>${startDate}</td>
//         <td>${endDate}</td>
//         <td>${status}</td>
//         <td><button class="addSubTask">Add Sub Task</button></td>
//         <td><button class="editTask">Edit</button></td>
//         <td><button class="deleteTask" >Delete</button></td>
//     `;
//     return row;
// }
//
//
// // Delete functionality
// taskTable.addEventListener("click", (event) => {
//     const rowToDelete = event.target.closest("tr");
//     //console.log(rowToDelete);
//
//     if (!event.target.classList.contains("deleteTask")){
//         return
//     }else{
//         const rowIndex = rowToDelete.rowIndex - 1; // Subtract 1 because JavaScript arrays are zero-indexed, and rowIndex starts at 1
//
//         if (rowIndex >= 0 && rowIndex < tasks.length) {
//             // Check if the rowIndex is within the bounds of the 'tasks' array
//             tasks.splice(rowIndex, 1); // Remove the object from the 'tasks' array
//         }
//         rowToDelete.remove();
//     }
//
//     console.log("delete button clicked")
//     console.log(tasks)
// });
//
//
// // Update functionality
// // Event listener for "Edit" buttons
// taskTable.addEventListener("click", (event) => {
//     if (event.target.classList.contains("editTask")) {
//         const rowToEdit = event.target.closest("tr");
//         const rowIndex = rowToEdit.rowIndex - 1; // Subtract 1 because JavaScript arrays are zero-indexed
//
//         if (rowIndex >= 0 && rowIndex < tasks.length) {
//             const taskToEdit = tasks[rowIndex];
//
//             // Populate the form fields with the task values for editing
//             taskIDInput.value = taskToEdit.id;
//             taskNameInput.value = taskToEdit.taskName;
//             startDateInput.value = taskToEdit.startDate; // Convert Date to yyyy-mm-dd format
//             endDateInput.value = taskToEdit.endDate;     // Convert Date to yyyy-mm-dd format
//             statusSelect.value = taskToEdit.status;
//
//             // Disable the Task ID input field as you probably don't want to edit the Task ID
//             taskIDInput.disabled = true;
//
//             // Change the button text to "Update Task"
//             addTaskBtn.textContent = "Update Task";
//
//             // Add an event listener for updating the task
//             addTaskBtn.removeEventListener("click", addTask); // Remove the old event listener
//             addTaskBtn.addEventListener("click", () => updateTask(rowIndex)); // Add a new event listener for updating
//         }
//     }
// });
//
// // Function to update an existing task or add a new task
// function updateTask(rowIndex) {
//     const editedTaskID = parseInt(taskIDInput.value);
//     const editedTaskName = taskNameInput.value;
//     const editedStartDate = new Date(startDateInput.value);
//     const editedEndDate = new Date(endDateInput.value);
//     const editedStatus = statusSelect.value;
//
//     if (editedTaskName.trim() === '') {
//         alert('Please fill Task Name');
//         return;
//     } else if (editedStartDate.toString() === 'Invalid Date') {
//         alert('Please fill Start Date');
//         return;
//     } else if (editedEndDate.toString() === 'Invalid Date') {
//         alert('Please fill End Date');
//         return;
//     } else if (editedEndDate < editedStartDate) {
//         alert('End Date should be after the Start Date');
//         return;
//     } else if (isTaskIDTaken(editedTaskID, rowIndex)) {
//         alert('Task ID is already taken.');
//         return;
//     }
//
//     // Create or update the task object with the edited values
//     const editedTask = tasks[rowIndex];
//     if (!editedTask) {
//         // If no task exists at the specified index, create a new one
//         const newTask = {
//             id: editedTaskID,
//             taskName: editedTaskName,
//             startDate: editedStartDate,
//             endDate: editedEndDate,
//             status: editedStatus,
//             subtask: []
//         };
//         tasks.push(newTask);
//         updateTaskList(newTask); // Add the new task to the table
//     } else {
//         // Update the existing task with the edited values
//         editedTask.id = editedTaskID;
//         editedTask.taskName = editedTaskName;
//         editedTask.startDate = editedStartDate;
//         editedTask.endDate = editedEndDate;
//         editedTask.status = editedStatus;
//         updateRow(rowIndex, editedTask); // Update the row with the edited task
//     }
//
//     // Clear the form and re-enable the Task ID input field
//     parentTaskForm.reset();
//     taskIDInput.disabled = false;
//
//     // Change the button text back to "Add Task"
//     addTaskBtn.removeEventListener("click", updateTask); // Remove the updateTask listener
//     addTaskBtn.addEventListener("click", addTask); // Re-add the addTask listener
//     addTaskBtn.textContent = "Add Task";
// }
//
// // Function to update the HTML row based on the edited task
// function updateRow(rowIndex, editedTask) {
//     const rowToUpdate = taskTable.rows[rowIndex + 1]; // Add 1 to adjust for table header
//     const cells = rowToUpdate.getElementsByTagName("td");
//
//     // Update the content of each cell with the task properties
//     cells[0].textContent = editedTask.id;
//     cells[1].textContent = editedTask.taskName;
//     cells[2].textContent = editedTask.startDate;
//     cells[3].textContent = editedTask.endDate;
//     cells[4].textContent = editedTask.status;
// }
//
//
// // Function to check if task ID is already taken
// function isTaskIDTaken(taskID, currentIndex) {
//     return tasks.some((task, index) => index !== currentIndex && task.id === taskID);
// }
//
//
// // add subtask functionality
//
// // event listener on add sub-task button (Add sub-task functionality)
// // taskTable.addEventListener("click", (event) => {
// //
// //     const addSubTask = event.target.closest("tr");
// //     //console.log(rowToDelete);
// //
// //     if (!event.target.classList.contains("addSubTask")){
// //         return
// //     }
// //
// //     const subTaskID = parseInt(taskIDInput.value);
// //     const subTaskTaskName = taskNameInput.value;
// //     const subTaskStartDate = new Date(startDateInput.value);
// //     const subTaskEndDate = new Date(endDateInput.value);
// //     const subTaskStatus = statusSelect.value;
// //
// //     if (isNaN(subTaskID)) {
// //         alert('Please fill Task ID');
// //         return;
// //     }else  if (isTaskIDTaken(subTaskID)) {
// //         alert('Task ID is already taken.');
// //         return;
// //     }
// //     else if(subTaskTaskName.trim() === ''){
// //         alert('Please fill Task Name');
// //         return;
// //     }else if( subTaskStartDate.toString() === 'Invalid Date' ){
// //         alert('Please fill Start Date');
// //         return;
// //     }else if( subTaskEndDate.toString() === 'Invalid Date' ){
// //         alert('Please fill End Date');
// //         return;
// //     }
// //     else if (subTaskEndDate < subTaskStartDate) {
// //         alert('End Date should be after the Start Date');
// //         return;
// //     }
// //
// //     if (isTaskIDTaken(taskID)) {
// //         alert('Task ID is already taken.');
// //         return;
// //     }
// //
// //     const subtask = {
// //         id: subTaskID,
// //         taskName: subTaskTaskName,
// //         startDate:subTaskStartDate,
// //         endDate:subTaskEndDate,
// //         status:subTaskStatus,
// //         // subTaskID:2,
// //         // subTaskTaskName: "subtask task2",
// //         // subTaskStartDate:Date('2000-01-15'),
// //         // subTaskEndDate:Date('2000-2-16'),
// //         // subTaskStatus:'in-progress'
// //     };
// //
// //     const taskObject = tasks.find(obj => obj.id);
// //
// //
// //     console.log("subtask pushed")
// //     console.log(taskObject);
// //     taskObject.subtask.push(taskObject);
// //     updateTaskList();
// //     // alert('Task added successfully!');
// //     console.log(tasks);
// //
// //     // Clear the form
// //     parentTaskForm.reset();
// // });
//
//
// // Assuming you have an array named `tasks` containing your tasks
//
// taskTable.addEventListener("click", (event) => {
//     const addSubTaskButton = event.target.closest("tr");
//
//     if (!event.target.classList.contains("addSubTask")){
//         return
//     }
//
//     const parentTaskID = parseInt(addSubTaskButton.getAttribute("data-task-id"));
//     const subTaskID = parseInt(taskIDInput.value);
//     const subTaskTaskName = taskNameInput.value;
//     const subTaskStartDate = startDateInput.value;
//     const subTaskEndDate = endDateInput.value;
//     const subTaskStatus = statusSelect.value;
//
//     if (isNaN(subTaskID)) {
//         alert('Please fill Task ID');
//         return;
//     } else if (isTaskIDTaken(subTaskID)) {
//         alert('Task ID is already taken.');
//         return;
//     } else if (subTaskTaskName.trim() === '') {
//         alert('Please fill Task Name');
//         return;
//     } else if (subTaskStartDate.toString() === 'Invalid Date') {
//         alert('Please fill Start Date');
//         return;
//     } else if (subTaskEndDate.toString() === 'Invalid Date') {
//         alert('Please fill End Date');
//         return;
//     } else if (subTaskEndDate < subTaskStartDate) {
//         alert('End Date should be after the Start Date');
//         return;
//     }
//
//     // Find the parent task based on its ID
//     const parentTask = tasks.find(task => task.id === parentTaskID);
//
//     // if (!parentTask) {
//     //     alert('Parent task not found.');
//     //     return;
//     // }
//
//     // Create the subtask object
//     const subtask = {
//         id: subTaskID,
//         taskName: subTaskTaskName,
//         startDate: subTaskStartDate,
//         endDate: subTaskEndDate,
//         status: subTaskStatus,
//     };
//
//     // Add the subtask to the parent task's subtasks array
//     parentTask.subtasks.push(subtask);
//
//     // Clear the form
//     parentTaskForm.reset();
//
//     // Update the task list with the added subtask
//     //updateTaskList();
//
//     console.log('Subtask added successfully!');
//     console.log(tasks);
// });
//
// // Function to update the task list
// // function updateTaskList() {
// //     // Your code to update the task list goes here
// // }


// Define an array to store tasks
let tasks = [];

// Add event listeners to the "Start Date" and "End Date" inputs
startDateInput.addEventListener('change', updateStatusOptions);
endDateInput.addEventListener('change', updateStatusOptions);

// Function to update the "Status" dropdown based on dates
function updateStatusOptions() {
    const startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        // Invalid dates, do nothing
        return;
    }

    const currentDate = new Date();
    if (endDate < currentDate) {
        // If the end date is in the past, set status to "Due-Passed"
        statusSelect.value = 'Due-Passed';
    } else if (startDate <= currentDate && endDate >= currentDate) {
        // If the current date is within the start and end date range, set status to "In-Progress"
        statusSelect.value = 'In-Progress';
    } else if (startDate > currentDate) {
        // If the start date is in the future, set status to "Scheduled"
        statusSelect.value = 'Scheduled';
    } else {
        // Default status
        statusSelect.value = '';
    }
}

// Function to add a task
function addTask() {
    // Get user inputs
    const taskID = parseInt(taskIDInput.value);
    const taskName = taskNameInput.value;
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    const status = statusSelect.value;

    // Validate user inputs
    if (!taskID) {
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

    // Check if task ID is already taken
    if (isTaskIDTaken(taskID)) {
        alert('Task ID is already taken.');
        return;
    }

    // Create a task object
    const task = {
        id: taskID,
        taskName: taskName,
        startDate: startDate,
        endDate: endDate,
        status: status,
        subtasks: [], // Initialize subtasks array
    };

    // Add the task to the tasks array
    tasks.push(task);

    // Update the table with the new task
    updateTaskList();

    // Clear input fields and show success message
    clearInputFields();
    alert('Task added successfully!');
}

// Function to update a task
function updateTask() {
    // Get user inputs
    const taskID = parseInt(taskIDInput.value);
    const taskName = taskNameInput.value;
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    const status = statusSelect.value;

    // Find the task to update
    const taskToUpdate = tasks.find(task => task.id === taskID);

    // Validate user inputs
    if (!taskToUpdate || taskName.trim() === '' || !isValidDate(startDate) || !isValidDate(endDate)) {
        alert('Invalid input or task not found. Please check your data.');
        return;
    }

    // Update the task object
    taskToUpdate.taskName = taskName;
    taskToUpdate.startDate = startDate;
    taskToUpdate.endDate = endDate;
    taskToUpdate.status = status;

    // Update the table with the updated task
    updateTaskList();

    // Clear input fields and show success message
    clearInputFields();
    alert('Task updated successfully!');

    parentTaskForm.reset();
    taskIDInput.disabled = false;

    // Change the button text back to "Add Task" and make it visible
    addTaskBtn.textContent = 'Add Task';
    addTaskBtn.removeEventListener('click', updateTask);
    addTaskBtn.addEventListener('click', addTask);
}

// Function to add a subtask to a parent task
function addSubtask(parentTaskId) {
    // Get user inputs
    const subTaskID = parseInt(taskIDInput.value);
    const subTaskName = taskNameInput.value;
    const subTaskStartDate = startDateInput.value;
    const subTaskEndDate = endDateInput.value;
    const subTaskStatus = statusSelect.value;

    // Validate user inputs
    if (!isValidDate(subTaskStartDate) || !isValidDate(subTaskEndDate)) {
        alert('Invalid input. Please fill all fields with valid data.');
        return;
    }

    // Find the parent task to add the subtask to
    const parentTask = tasks.find(task => task.id === parentTaskId);

    // Ensure the parent task exists
    if (!parentTask) {
        alert('Parent task not found.');
        return;
    }

    // Create a subtask object
    const subtask = {
        id: subTaskID,
        taskName: subTaskName,
        startDate: subTaskStartDate,
        endDate: subTaskEndDate,
        status: subTaskStatus,
    };

    // Add the subtask to the parent task's subtasks array
    parentTask.subtasks.push(subtask);

    // Update the table with the new subtask
    updateTaskList();

    // Clear input fields and show success message
    clearInputFields();
    alert('Subtask added successfully!');
}

// Function to check if a task ID is already taken
function isTaskIDTaken(taskID) {
    return tasks.some(task => task.id === taskID);
}

// Function to validate date inputs
function isValidDate(dateString) {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
}

// Function to clear input fields
function clearInputFields() {
    taskIDInput.value = '';
    taskNameInput.value = '';
    startDateInput.value = '';
    endDateInput.value = '';
    statusSelect.value = '';
}

// Function to update the task list in the HTML table
// Function to update the task list in the HTML table
function updateTaskList() {
    // Get the table body element
    const tableBody = document.getElementById('tableBody');

    // Clear existing table rows
    tableBody.innerHTML = '';

    // Iterate through tasks and populate the table
    tasks.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.id}</td>
            <td>${task.taskName}</td>
            <td>${task.startDate}</td>
            <td>${task.endDate}</td>
            <td>${task.status}</td>
            <td><button class="addSubTask" data-task-id="${task.id}">Add Subtask</button></td>
            <td><button class="editTask" data-task-id="${task.id}">Edit</button></td>
            <td><button class="deleteTask" data-task-id="${task.id}">Delete</button></td>
        `;

        // Append the row to the table
        tableBody.appendChild(row);

        // Check if the task has subtasks
        if (task.subtasks && task.subtasks.length > 0) {
            // Iterate through subtasks and add rows to the table
            task.subtasks.forEach(subtask => {
                const subRow = document.createElement('tr');
                subRow.innerHTML = `
                    <td>${subtask.id}</td>
                    <td>${subtask.taskName}</td>
                    <td>${subtask.startDate}</td>
                    <td>${subtask.endDate}</td>
                    <td>${subtask.status}</td>
                    <td></td> <!-- Empty cell for subtasks -->
                    <td></td> <!-- Empty cell for subtasks -->
                    <td></td> <!-- Empty cell for subtasks -->
                `;

                // Append the subtask row to the table
                tableBody.appendChild(subRow);
            });
        }
    });
}

// Event listener for adding a subtask
taskTable.addEventListener('click', (event) => {
    if (event.target.classList.contains('addSubTask')) {
        const parentTaskId = parseInt(event.target.getAttribute('data-task-id'));
        addSubtask(parentTaskId);
    }
});

// Event listener for editing a task
// Function to populate the form with task details for editing
function editTask(taskId) {
    // Find the task to edit
    const taskToEdit = tasks.find(task => task.id === taskId);

    if (!taskToEdit) {
        alert('Task not found.');
        return;
    }

    // Populate the form fields with the task details
    taskIDInput.value = taskToEdit.id;
    taskNameInput.value = taskToEdit.taskName;
    startDateInput.value = taskToEdit.startDate;
    endDateInput.value = taskToEdit.endDate;
    statusSelect.value = taskToEdit.status;

    // Disable the Task ID input field during editing
    taskIDInput.disabled = true;

    // Change the button text and add event listener for updating
    addTaskBtn.textContent = 'Update Task';
    addTaskBtn.removeEventListener('click', addTask);
    addTaskBtn.addEventListener('click', () => updateTask(taskId));
}

// Event listener for editing a task
taskTable.addEventListener('click', (event) => {
    if (event.target.classList.contains('editTask')) {
        const taskId = parseInt(event.target.getAttribute('data-task-id'));
        editTask(taskId);
    }
});


// Event listener for deleting a task
taskTable.addEventListener('click', (event) => {
    if (event.target.classList.contains('deleteTask')) {
        const taskId = parseInt(event.target.getAttribute('data-task-id'));
        deleteTask(taskId);
    }
});


// Event listener for adding or updating a task
addTaskBtn.addEventListener('click', addTask);

// Event listener for updating a task
updateTaskBtn.addEventListener('click', updateTask);

// Event listener for adding a subtask
// Function to add a subtask to a parent task
function addSubtask(parentTask, subTaskID, subTaskName, subTaskStartDate, subTaskEndDate, subTaskStatus) {
    const subtask = {
        id: subTaskID,
        subTaskName: subTaskName,
        subTaskStartDate: subTaskStartDate,
        subTaskEndDate: subTaskEndDate,
        subTaskStatus: subTaskStatus,
    };

    parentTask.subtask.push(subtask);
}

// Function to create a row for subtask in the table
function createSubtaskRow(subtask) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${subtask.id}</td>
        <td>${subtask.subTaskName}</td>
        <td>${subtask.subTaskStartDate}</td>
        <td>${subtask.subTaskEndDate}</td>
        <td>${subtask.subTaskStatus}</td>
    `;
    return row;
}

// Event listener for adding subtasks
taskTable.addEventListener('click', (event) => {
    const addButton = event.target.closest('.addSubTask');
    if (addButton) {
        const parentRow = addButton.closest('tr');
        const parentTaskID = parseInt(parentRow.getAttribute('data-task-id'));

        // Get subtask input values
        const subTaskID = parseInt(taskIDInput.value);
        const subTaskName = taskNameInput.value;
        const subTaskStartDate = startDateInput.value;
        const subTaskEndDate = endDateInput.value;
        const subTaskStatus = statusSelect.value;

        // Validate subtask inputs
        if (!subTaskID) {
            alert('Subtask ID is required.');
            return;
        }

        if (!subTaskName) {
            alert('Subtask Name is required.');
            return;
        }

        if (!subTaskStartDate) {
            alert('Subtask Start Date is required.');
            return;
        }

        if (!subTaskEndDate) {
            alert('Subtask End Date is required.');
            return;
        }

        if (subTaskEndDate < subTaskStartDate) {
            alert('Subtask End date must be after the start date.');
            return;
        }

        // Find the parent task and add the subtask
        const parentTask = tasks.find(task => task.id === parentTaskID);
        if (parentTask) {
            addSubtask(parentTask, subTaskID, subTaskName, subTaskStartDate, subTaskEndDate, subTaskStatus);

            // Create and append the subtask row
            const subtaskRow = createSubtaskRow({
                id: subTaskID,
                subTaskName: subTaskName,
                subTaskStartDate: subTaskStartDate,
                subTaskEndDate: subTaskEndDate,
                subTaskStatus: subTaskStatus,
            });
            parentRow.insertAdjacentElement('afterend', subtaskRow);

            // Clear the subtask form
            taskNameInput.value = '';
            startDateInput.value = '';
            endDateInput.value = '';
            statusSelect.value = '';

            console.log('Subtask added successfully!');
        } else {
            alert('Parent task not found.');
        }
    }
});

// Update the table with tasks and subtasks
function updateTaskList() {
    // Clear the table
    tableBody.innerHTML = '';

    tasks.forEach(task => {
        const parentRow = createTableRow(task);
        tableBody.appendChild(parentRow);

        if (task.subtask && task.subtask.length > 0) {
            task.subtask.forEach(subtask => {
                const subtaskRow = createSubtaskRow(subtask);
                tableBody.appendChild(subtaskRow);
            });
        }
    });
}

// Initialize the table with existing tasks (if any)
updateTaskList();
