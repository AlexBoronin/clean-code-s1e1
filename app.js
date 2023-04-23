"use strict"
const taskInput = document.getElementById("new-task");
const addButton = document.getElementById("add");
const incompleteTaskHolder = document.getElementById("incomplete-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");


//New task list item
const createNewTaskElement = function (taskString) {
    let listItem = document.createElement("li");
    let checkBox = document.createElement("input");
    let label = document.createElement("label");
    let editInput = document.createElement("input");
    let editButton = document.createElement("button");
    let deleteButton = document.createElement("button");
    let deleteButtonImg = document.createElement("img");

    label.innerText = taskString;

    //Each elements, needs appending
    label.className = 'task-lbl';
    listItem.className = "task-item";
    checkBox.type = "checkbox";
    checkBox.className = "check";
    checkBox.id = taskInput.value.slice(0, taskInput.value.indexOf(' ') || null);
    label.htmlFor = taskInput.value.slice(0, taskInput.value.indexOf(' ') || null);
    editInput.type = "text";
    editInput.className = "task";
    editButton.innerText = "Edit";
    editButton.className = "btn edit";
    deleteButton.className = "btn delete";
    deleteButtonImg.src = './remove.svg';
    deleteButtonImg.alt = 'Delete';
    deleteButtonImg.className = "delete_image"
    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}


const addTask = function () {
    if (!taskInput.value) return;
    let listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
}


//Edit an existing task.
const editTask = function () {
    let listItem = this.parentNode;
    let editInput = listItem.querySelector('.task');
    let label = listItem.querySelector(".task-lbl");
    let editBtn = listItem.querySelector(".edit");
    let containsClass = listItem.classList.contains("editMode");
    if (containsClass) {
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }
    listItem.classList.toggle("editMode");
};


//Delete task.
const deleteTask = function () {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);
}

//Mark task completed
const taskCompleted = function () {
    let listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete = function () {
    //Mark task as incomplete.
    // When the checkbox is unchecked append the task list item to the #incompleteTasks.
    let listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    let checkBox = taskListItem.querySelector(".check");
    let editButton = taskListItem.querySelector(".edit");
    let deleteButton = taskListItem.querySelector(".delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

//bind events to list items children(tasksCompleted)
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//bind events to list items children(tasksIncompleted)
for (let i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}