// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));
// connect to the main screen button, modal inputs, and to-do column to attach the task cards
const taskBtn = $('#taskBtn');
const title = $("#taskTitle");
const dueDate = $("#datepicker");
const description = $("#description");
const todoCards = $("#todo-cards");

// Todo: create a function to generate a unique task id
function generateTaskId() {
    // if nextID is nothing, it becomes the number 1, then increases by 1 each time this runs
    if (nextId === null) {
        nextId = 1;
    } else {
        nextId++;
    }
    localStorage.setItem('nextID', JSON.stringify(nextId));
    return nextId;
}

// Todo: create a function to create a task card
function createTaskCard() {
    // pulls input items from storage and puts them into an array
    let lastTask = JSON.parse(localStorage.getItem("tasks")) || [];
    // for each object in the array, create a card and add the input items to it as text
    for (let i=0; i < lastTask.length; i++) {
      let card = $("<div>").addClass('task-card draggable my-3');
      let cardHead = $('<div>').addClass('card-header').text(lastTask[i].title);
      let cardBody = $("<div>").addClass('card-body');
      let cardTitle = $("<h5>").addClass('card-title').text(lastTask[i].description);
      let cardText = $("<p>").addClass('card-text').text(lastTask[i].dueDate);
    //   set the card button to delete the card on click
      let cardBtn = $("<button>").addClass('btn btn-danger delete').text('Delete').on('click', handleDeleteTask);

      card.attr('data-task-id', lastTask[i].id);
    //   adds the card to the page
      cardBody.append(cardTitle, cardText, cardBtn);
      card.append(cardHead, cardBody);
    //   this sets the status of the card so that it can be registered to a different column
      if (lastTask[i].status === 'to-do') {
            $('#todo-cards').append(card);
      } else if (lastTask[i].status === 'in-progress') {
            $('#in-progress').append(card);
      } else {
            $('#done').append(card)
      }
    //   compares today's date with the due date on the card
      let now = dayjs();
      let taskDueDate = dayjs(lastTask[i].dueDate, 'MM/DD/YYYY');
    //   and sets the color to yellow if before or on that day, red if after
      if (now.isBefore(taskDueDate, 'day')) {
        card.addClass('bg-warning text-white');
      } else if (now.isAfter(taskDueDate, 'day')) {
        card.addClass('bg-danger text-white');
        cardBtn.addClass('border-light');
      } else if (now.isSame(taskDueDate, 'day')) {
        card.addClass('bg-warning text-white');
      }
    //   clears the modal input fields so they're empty for the next task
      title.val('');
      description.val('');
      dueDate.val('');
    }  
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    createTaskCard();
    $( ".draggable" ).draggable();
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
// I just put all this in the createTaskCard function, couldn't figure out why it needed a separate function
}

// Todo: create a function to handle deleting a task
// I tried two different methods, a filter and a for/each, and neither works. Not sure what I need to change to make it work
function handleDeleteTask(event){
    const taskID = $(this).attr('data-task-id');
    console.log(taskID);
    // taskList = taskList.filter(task => task.id !== parseInt(taskID));
    taskList.forEach((task) => {
        if (task.id === taskID) {
            taskList.splice(taskList.indexOf(task), 1);
        }
    });
    // taskID.remove();
    localStorage.setItem('tasklist', JSON.stringify(taskList));
    renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
// This has something to do with the status change I set in lines 42-47, need to figure out what to do with this
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $( "#datepicker" ).datepicker();
    $( ".droppable" ).droppable();
    taskBtn.on('click', function (event) {
        // puts the input values from storage into an object, along with the unique card id and a starter status
        const taskEntry = {
            id: generateTaskId(),
            title: title.val(),
            dueDate: dueDate.val(),
            description: description.val(),
            status: 'to-do',
        }
        taskList.push(taskEntry);
        localStorage.setItem('tasks', JSON.stringify(taskList));
        console.log(taskEntry);
        console.log(taskList);
        renderTaskList();
    });
    renderTaskList();
});
