// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));
const taskBtn = $('#taskBtn');
const title = $("#taskTitle");
const dueDate = $("#datepicker");
const description = $("#description");
const todoCards = $("#todo-cards");

// Todo: create a function to generate a unique task id
function generateTaskId() {
    
}

// Todo: create a function to create a task card
function createTaskCard() {
    for (let i=0; i < taskList.length; i++) {
      let card = $("<div>").addClass('card draggable my-3');
      let cardHead = $('<div>').addClass('card-header').text(taskList[i].title);
      let cardBody = $("<div>").addClass('card-body');
      let cardTitle = $("<h5>").addClass('card-title').text(taskList[i].description);
      let cardText = $("<p>").addClass('card-text').text(taskList[i].dueDate);
      let cardBtn = $("<button>").addClass('btn btn-danger delete').text('Delete');

      cardBody.append(cardTitle, cardText, cardBtn);
      // cardBody.append(cardText);
      // cardBody.append(cardBtn);
      card.append(cardHead, cardBody);
      // card.append(cardBody);

      todoCards.append(card);
      console.log(card);
      renderTaskList();
      return card;
    }  
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    $( ".draggable" ).draggable();
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
    taskBtn.on('click', function (event) {
        const taskEntry = {
            title: title.val(),
            dueDate: dueDate.val(),
            description: description.val(),
        }
        taskList.push(taskEntry);
        localStorage.setItem('tasks', JSON.stringify(taskList));
        console.log(taskEntry);
        console.log(taskList);
        createTaskCard();
    });
});
