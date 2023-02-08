let input = document.querySelector(".input")
let submit = document.querySelector(".add")
let tasksDiv = document.querySelector(".tasks")

//empty array
let arrayOfTasks = [];

//chechif there is data n localstorage
if (window.localStorage.length !== 0) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"))
}

//triger get data to localstorage
getDataFromLocalStorage();

// add tasks
submit.onclick = function () {
    if (input.value !== "") {
        addTaskToArray(input.value); //add tasksto array of tasks
        input.value = ""; // empty input field
    }
}
//click on task element
tasksDiv.addEventListener("click", (e) => {
    // delete button
    if (e.target.classList.contains("del")){
        //remove task from local storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"))
        //remove element from page
        e.target.parentElement.remove();
    }
    //task element
    if (e.target.classList.contains("task")) {
        //toggle completed for the task
        toggleStatusTaskWith(e.target.getAttribute("data-id"));
        //toggle done class
        e.target.classList.toggle("done");
    }
})

function addTaskToArray(taskText) {
    //task Data
    const task = {
        id:Date.now(),
        title: taskText,
        completed: false,
    };
    //push task to array
    arrayOfTasks.push(task);
    // add tasts to page
    addElementToPageFrom(arrayOfTasks)
    //add tasks to local storage
    addDateToLocalStorageFrom(arrayOfTasks);
}

function addElementToPageFrom(arrayOfTasks) {
    // empty tasks div
    tasksDiv.innerHTML = "";
    //looping on array of tasks
    arrayOfTasks.forEach((task) => {
        //create main div
        let div = document.createElement("div");
        div.className = "task";
        //check if task is done
        if (task.completed) {
            div.className = "task done"
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title))
        //create delete button
        let span = document.createElement("span")
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"))
        //append button to main div
        div.appendChild(span);
        //add task div to task container
        tasksDiv.appendChild(div);
    });
}

function addDateToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
}

function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addElementToPageFrom(tasks);
    }
}

function deleteTaskWith(taskId) {
    // //for explain only
    // for (let i = 0; i < arrayOfTasks.length; i++) {
    //     console.log(`${arrayOfTasks[i].id} === ${taskId}`);    
    // }
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId)
    addDateToLocalStorageFrom(arrayOfTasks);
}
function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {    
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false)
            addDateToLocalStorageFrom(arrayOfTasks);
        }
    }
}
// change background color randomly
let colorArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
let color = [];
for (let i = 0; i < 6; i++) {
    color.push(colorArray[Math.floor(Math.random() * (colorArray.length))]);
}
let finalColor = `#${color.join("")}`
document.body.style.backgroundColor = finalColor;

submit.style.backgroundColor = finalColor;



























