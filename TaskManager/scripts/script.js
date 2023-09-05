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

let tasks = [
    {
        id: 1,
        taskName: 'task1',
        startDate: '2023-09-03T23:08',
        endDate: '2023-09-05T23:08',
        status:'In-Progress',
        subtask:[
            {
                id:1,
                subTaskName: "subtask task1",
                subTaskStartDate:'2023-09-03T23:08',
                subTaskEndDate:'2023-09-05T23:08',
                subTaskStatus:'In-Progress',
            }

        ]
    }
];

//show table data (add, edit, add ,subtask works)

function showTable(tasks) {
    const tableBody = document.querySelector('#taskTable tbody');
    //tableBody.innerHTML = ''; // Clear existing rows
console.log(tasks);
    // taskTable.innerHTML = `<tr>
    //             <td>Task ID</td>
    //             <td>Task Name</td>
    //             <td>Start Date</td>
    //             <td>End Date</td>
    //             <td>Status</td>
    //             <th>Add Sub Task</th>
    //             <th>Edit</th>
    //             <th>Delete</th>
    //     </tr>`;

    tasks.forEach(task => {
        const parentRow = document.createElement('tr');
        parentRow.innerHTML = `
                    <td>${task.id}</td>
                    <td class="parent-task ${task.subtask.length > 0 ? 'has-subtasks' : ''}">${task.taskName}</td>
                    <td>${task.startDate}</td>
                    <td>${task.endDate}</td>
                    <td>${task.status}</td>
                    <td><button class="addSubTask">Add Sub Task</button></td>
                    <td><button class="editTask">Edit</button></td>
                    <td><button class="deleteTask">Delete</button></td>\`
           
                `;
        tableBody.appendChild(parentRow);



        if (task.subtasks && task.subtasks.length > 0) {
            task.subtasks.forEach((subtask, index) => {
                // Generate a unique subtask ID based on the parent task ID and index
                subtask.id = generateSubtaskID(task.id, index + 1);

                const subtaskRow = document.createElement('tr');
                subtaskRow.className = 'subtask-row'; // Hide subtask row by default
                subtaskRow.innerHTML = `
                            <td>${subtask.id}</td>
                            <td>${subtask.taskName}</td>
                            <td>${subtask.startDate}</td>
                            <td>${subtask.endDate}</td>
                            <td>${subtask.status}</td>
                        `;
                tableBody.appendChild(subtaskRow);
            });
        }

        // Add a click event listener to the parent task row to toggle subtask visibility
        parentRow.addEventListener('click', () => {
            const subtaskRows = document.querySelectorAll('.subtask-row');
            subtaskRows.forEach(subtaskRow => {
                subtaskRow.style.display = 'none';
            });
            const subtasks = parentRow.nextElementSibling; // Get the next row (subtasks)
            subtasks.style.display = subtasks.style.display === 'none' ? 'table-row' : 'none';
        });
    });
}

// Initial population of the table
showTable(tasks);

// Function to generate a unique subtask ID
function generateSubtaskID(parentID, index) {
    return `${parentID}-${index}`;
}


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
//                 <td>${tasks[i].id}</td>
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


// search function

// Function to filter tasks based on user input
function filterTasks() {
    const search = document.querySelector('#searchTask').value.toLowerCase();

    const filteredTasks = tasks.filter(obj =>
        obj.id.toString().includes(search)||
        obj.taskName.toLowerCase().includes(search) ||
        obj.startDate.toISOString().slice(0, 10).includes(search) ||
        obj.endDate.toISOString().slice(0, 10).includes(search) ||
        obj.status.toLowerCase().includes(search)
    );

    console.log("this is filtered task")
    console.log(filteredTasks);
    showTable(filteredTasks);
}

// Event listener for the search input
document.querySelector('#searchTask').addEventListener('input', filterTasks);




// event listner on add task button (Add task functionality)
const addTask = addTaskBtn.addEventListener('click', () => {

    const taskID = parseInt(taskIDInput.value);
    const taskName = taskNameInput.value;
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    const status = statusSelect.value;

    if (isNaN(taskID)) {
        alert('Please fill Task ID');
        return;
    }else  if (isTaskIDTaken(taskID)) {
        alert('Task ID is already taken.');
        return;
    }
    else if(taskName.trim() === ''){
        alert('Please fill Task Name');
        return;
    }else if( startDate.toString() === 'Invalid Date' ){
        alert('Please fill Start Date');
        return;
    }else if( endDate.toString() === 'Invalid Date' ){
        alert('Please fill End Date');
        return;
    }
    else if (endDate < startDate) {
        alert('End Date should be after the Start Date');
        return;
    }

    if (isTaskIDTaken(taskID)) {
        alert('Task ID is already taken.');
        return;
    }

    const task = {
        id: taskID,
        taskName: taskName,
        startDate:startDate,
        endDate:endDate,
        status:status,
        subtask:[]
    };

    tasks.push(task);
    updateTaskList();
    // alert('Task added successfully!');
    console.log(tasks);

    // Clear the form
    parentTaskForm.reset();

});


// to check if task id is already taken
function isTaskIDTaken(taskID) {
    return tasks.some(task => task.id === taskID);
}


// Update task list in html
function updateTaskList() {
    const taskID = taskIDInput.value;
    const taskName= taskNameInput.value;
    const startDate= startDateInput.value;
    const endDate = endDateInput.value;
    const status = statusSelect.value;

    const newRow = createTableRow(taskID,taskName, startDate, endDate, status);
    taskTable.appendChild(newRow);
}

// create table in html
function createTableRow(taskID, taskName, startDate, endDate, status) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${taskID}</td>
        <td>${taskName}</td>
        <td>${startDate}</td>
        <td>${endDate}</td>
        <td>${status}</td>
        <td><button class="addSubTask">Add Sub Task</button></td>
        <td><button class="editTask">Edit</button></td>
        <td><button class="deleteTask" >Delete</button></td>
    `;
    return row;
}


// Delete functionality
taskTable.addEventListener("click", (event) => {
    const rowToDelete = event.target.closest("tr");
    //console.log(rowToDelete);

    if (!event.target.classList.contains("deleteTask")){
        return
    }else{
        const rowIndex = rowToDelete.rowIndex - 1; // Subtract 1 because JavaScript arrays are zero-indexed, and rowIndex starts at 1

        if (rowIndex >= 0 && rowIndex < tasks.length) {
            // Check if the rowIndex is within the bounds of the 'tasks' array
            tasks.splice(rowIndex, 1); // Remove the object from the 'tasks' array
        }
        rowToDelete.remove();
    }
    
    console.log("delete button clicked")
    console.log(tasks)
});


// Update functionality
// Event listener for "Edit" buttons
taskTable.addEventListener("click", (event) => {
    if (event.target.classList.contains("editTask")) {
        const rowToEdit = event.target.closest("tr");
        const rowIndex = rowToEdit.rowIndex - 1; // Subtract 1 because JavaScript arrays are zero-indexed

        if (rowIndex >= 0 && rowIndex < tasks.length) {
            const taskToEdit = tasks[rowIndex];

            // Populate the form fields with the task values for editing
            taskIDInput.value = taskToEdit.id;
            taskNameInput.value = taskToEdit.taskName;
            startDateInput.value = taskToEdit.startDate; // Convert Date to yyyy-mm-dd format
            endDateInput.value = taskToEdit.endDate;     // Convert Date to yyyy-mm-dd format
            statusSelect.value = taskToEdit.status;

            // Disable the Task ID input field as you probably don't want to edit the Task ID
            taskIDInput.disabled = true;

            // Change the button text to "Update Task"
            addTaskBtn.textContent = "Update Task";

            // Add an event listener for updating the task
            addTaskBtn.removeEventListener("click", addTask); // Remove the old event listener
            addTaskBtn.addEventListener("click", () => updateTask(rowIndex)); // Add a new event listener for updating
        }
    }
});

// Function to update an existing task or add a new task
function updateTask(rowIndex) {
    const editedTaskID = parseInt(taskIDInput.value);
    const editedTaskName = taskNameInput.value;
    const editedStartDate = new Date(startDateInput.value);
    const editedEndDate = new Date(endDateInput.value);
    const editedStatus = statusSelect.value;

    if (editedTaskName.trim() === '') {
        alert('Please fill Task Name');
        return;
    } else if (editedStartDate.toString() === 'Invalid Date') {
        alert('Please fill Start Date');
        return;
    } else if (editedEndDate.toString() === 'Invalid Date') {
        alert('Please fill End Date');
        return;
    } else if (editedEndDate < editedStartDate) {
        alert('End Date should be after the Start Date');
        return;
    } else if (isTaskIDTaken(editedTaskID, rowIndex)) {
        alert('Task ID is already taken.');
        return;
    }

    // Create or update the task object with the edited values
    const editedTask = tasks[rowIndex];
    if (!editedTask) {
        // If no task exists at the specified index, create a new one
        const newTask = {
            id: editedTaskID,
            taskName: editedTaskName,
            startDate: editedStartDate,
            endDate: editedEndDate,
            status: editedStatus,
            subtask: []
        };
        tasks.push(newTask);
        updateTaskList(newTask); // Add the new task to the table
    } else {
        // Update the existing task with the edited values
        editedTask.id = editedTaskID;
        editedTask.taskName = editedTaskName;
        editedTask.startDate = editedStartDate;
        editedTask.endDate = editedEndDate;
        editedTask.status = editedStatus;
        updateRow(rowIndex, editedTask); // Update the row with the edited task
    }

    // Clear the form and re-enable the Task ID input field
    parentTaskForm.reset();
    taskIDInput.disabled = false;

    // Change the button text back to "Add Task"
    addTaskBtn.removeEventListener("click", updateTask); // Remove the updateTask listener
    addTaskBtn.addEventListener("click", addTask); // Re-add the addTask listener
    addTaskBtn.textContent = "Add Task";
}

// Function to update the HTML row based on the edited task
function updateRow(rowIndex, editedTask) {
    const rowToUpdate = taskTable.rows[rowIndex + 1]; // Add 1 to adjust for table header
    const cells = rowToUpdate.getElementsByTagName("td");

    // Update the content of each cell with the task properties
    cells[0].textContent = editedTask.id;
    cells[1].textContent = editedTask.taskName;
    cells[2].textContent = editedTask.startDate.toISOString().slice(0, 10);
    cells[3].textContent = editedTask.endDate.toISOString().slice(0, 10);
    cells[4].textContent = editedTask.status;
}


// Function to check if task ID is already taken
function isTaskIDTaken(taskID, currentIndex) {
    return tasks.some((task, index) => index !== currentIndex && task.id === taskID);
}


// add subtask functionality

// event listener on add sub-task button (Add sub-task functionality)
taskTable.addEventListener("click", (event) => {

    const addSubTask = event.target.closest("tr");
    //console.log(rowToDelete);

    if (!event.target.classList.contains("addSubTask")){
        return
    }

    const subTaskID = parseInt(taskIDInput.value);
    const subTaskTaskName = taskNameInput.value;
    const subTaskStartDate = new Date(startDateInput.value);
    const subTaskEndDate = new Date(endDateInput.value);
    const subTaskStatus = statusSelect.value;

    if (isNaN(subTaskID)) {
        alert('Please fill Task ID');
        return;
    }else  if (isTaskIDTaken(subTaskID)) {
        alert('Task ID is already taken.');
        return;
    }
    else if(subTaskTaskName.trim() === ''){
        alert('Please fill Task Name');
        return;
    }else if( subTaskStartDate.toString() === 'Invalid Date' ){
        alert('Please fill Start Date');
        return;
    }else if( subTaskEndDate.toString() === 'Invalid Date' ){
        alert('Please fill End Date');
        return;
    }
    else if (subTaskEndDate < subTaskStartDate) {
        alert('End Date should be after the Start Date');
        return;
    }

    if (isTaskIDTaken(taskID)) {
        alert('Task ID is already taken.');
        return;
    }

    const subtask = {
        id: subTaskID,
        taskName: subTaskTaskName,
        startDate:subTaskStartDate,
        endDate:subTaskEndDate,
        status:subTaskStatus,
        // subTaskID:2,
        // subTaskTaskName: "subtask task2",
        // subTaskStartDate:Date('2000-01-15'),
        // subTaskEndDate:Date('2000-2-16'),
        // subTaskStatus:'in-progress'
    };

    const taskObject = tasks.find(obj => obj.id);


    console.log("subtask pushed")
    console.log(taskObject);
    taskObject.subtask.push(taskObject);
    updateTaskList();
    // alert('Task added successfully!');
    console.log(tasks);

    // Clear the form
    parentTaskForm.reset();
});
