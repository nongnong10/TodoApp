//Selectors
const taskInput = document.querySelector(".task-input");
const taskButton = document.querySelector(".submit-btn");
const taskList = document.querySelector(".task-list");
const taskStatus = document.querySelector(".task-status");
//Event listener
document.addEventListener("DOMContentLoaded", getTask);
taskButton.addEventListener("click", addTask);
taskList.addEventListener("click", deleteTask);
taskStatus.addEventListener("click", filterTodo);

//Fuctions
function addTask(event){
    event.preventDefault();

    //Task div
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task"); 

    //Create task li
    const newTask = document.createElement("li");
    newTask.innerText = taskInput.value;
    newTask.classList.add('task-item');
    taskDiv.appendChild(newTask);

    //Add todo to localstorage
    saveLocalTask(taskInput.value);

    //Create Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    taskDiv.appendChild(deleteButton);

    //Create Done Button
    const doneButton = document.createElement('button');
    doneButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    doneButton.classList.add('done-btn');
    taskDiv.appendChild(doneButton);

    taskList.appendChild(taskDiv);
    taskInput.value = "";
}

function deleteTask(event){
    const item = event.target;
    console.log(event.target);
    if (item.classList[0] == 'delete-btn'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        // todo.remove();
        removeLocalTask(todo);
        todo.addEventListener("transitionend", function(){
            todo.remove();
        });
    }
    if (item.classList[0] == 'done-btn'){
        item.parentElement.classList.toggle('done');
    }
}

function filterTodo(event){
    const todos = taskList.childNodes;
    console.log(todos);
    todos.forEach(function(task){
        switch(event.target.value){
            case "all": 
            task.style.display = "flex";
                break;
            case "done":
                console.log("done");
                if (task.classList.contains("done")) {
                    task.style.display = "flex";
                } else {
                    task.style.display = "none";
                }
                break;
            case "doing":
                if (!task.classList.contains("done")) {
                    task.style.display = "flex";
                } else {
                    task.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTask(task){
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(task);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTask(){
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        //Task div
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task"); 

        //Create task li
        const newTask = document.createElement("li");
        newTask.innerText = todo;
        newTask.classList.add('task-item');
        taskDiv.appendChild(newTask);

        //Create Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteButton.classList.add("delete-btn");
        taskDiv.appendChild(deleteButton);

        //Create Done Button
        const doneButton = document.createElement('button');
        doneButton.innerHTML = '<i class="fa-solid fa-check"></i>';
        doneButton.classList.add('done-btn');
        taskDiv.appendChild(doneButton);

        console.log(1);
        taskList.appendChild(taskDiv);
    });
}

function removeLocalTask(todo){
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    
    
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}