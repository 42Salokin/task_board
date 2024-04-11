// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));
const taskBtn = document.querySelector('#taskBtn');
const title = document.querySelector('#taskTitle');
const dueDate = document.querySelector('#datepicker');
const description = document.querySelector('#description');

// Todo: create a function to generate a unique task id
function generateTaskId() {
    
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const todoCards = document.querySelector('#todo-cards');
    let card = $("<div>");
    let cardHead = $('<div>');
    let cardBody = $("<div>");
    let cardTitle = $("<h5>");
    let cardText = $("<p>");
    let cardBtn = $("<button>");

    card.attr('class', 'card');
    cardHead.attr('class', 'card-header');
    cardBody.attr('class', 'card-body');
    cardTitle.attr('class', 'card-title');
    cardText.attr('class', 'card-text');
    cardBtn.attr('class', 'btn btn-danger');
// jQuery commands need the $() at the beginning
    cardHead.text('Task Title');
    cardTitle.text('Description');
    cardText.text('Due Date');
    cardBtn.text('Delete');

    cardBody.append(cardTitle);
    cardBody.append(cardText);
    cardBody.append(cardBtn);
    card.append(cardHead);
    card.append(cardBody);
    todoCards.append(card);
    console.log(card);

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $( "#datepicker" ).datepicker();
    taskBtn.addEventListener('click', function (event) {
        const taskEntry = {
            title: title.value,
            dueDate: dueDate.value,
            description: description.value,
        }
        taskList.push(taskEntry);
        localStorage.setItem('tasks', JSON.stringify(taskList));
        console.log(taskEntry);
        console.log(taskList);
        createTaskCard();
    });
});
