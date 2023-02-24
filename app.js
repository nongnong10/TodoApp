//Selectors
const taskInput = document.querySelector(".task-input");
const taskButton = document.querySelector(".submit-btn");
const taskList = document.querySelector(".task-list");

//Event listener
taskButton.addEventListener("click", addTask);

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

    //Create Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.classList.add("delete-btn");
    taskDiv.appendChild(deleteButton);

    //Create Done Button
    const doneButton = document.createElement('button');
    doneButton.innerHTML = 'Done';
    doneButton.classList.add('done-btn');
    taskDiv.appendChild(doneButton);

    taskList.appendChild(taskDiv);
    taskInput.value = "";
}