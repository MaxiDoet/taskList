let taskList = document.querySelectorAll(".app-tasks")[0];

let addTextInput = document.getElementsByClassName("app-add-input")[0];
let addTextButton = document.getElementsByClassName("app-add-button")[0];

tasks = {};

function addTask(title, done, id) {
    /* Reference 
    <div class="item"><i class="fluid-icon"><span class="material-icons">watch_later</span></i>Item 1</div>
    */

    let task = document.createElement("div");
    task.className = "item task";
    task.dataset.taskId = id;

    if (done) {
        task.classList.add("active");
    } else {
        task.classList.remove("active");
    }

    // Add event listeners
    task.addEventListener("click", function() {
        if (task.classList.contains("active")) {
            task.classList.remove("active");
            changeTask(id, false);
        } else {
            task.classList.add("active");
            changeTask(id, true);
        }
    });

    let taskIcon = document.createElement("i");
    taskIcon.className = "fluid-icon";

    let taskSpan = document.createElement("span");
    taskSpan.className = "material-icons";
    taskSpan.textContent = (done) ? "done_outline" : "watch_later";

    let taskText = document.createElement("span");
    taskText.textContent = title;

    let taskDelete = document.createElement("span");
    taskDelete.className = "task-delete material-icons";
    taskDelete.textContent = "delete";

    taskDelete.addEventListener("click", function() {
       removeTask(id);
    });

    taskIcon.appendChild(taskSpan);
    task.appendChild(taskIcon);
    task.appendChild(taskText);
    task.appendChild(taskDelete);

    taskList.appendChild(task);

    tasks[id] = {title: title, done: done};

    postUpdate(JSON.stringify(tasks));
}

function removeTask(id) {
    for (let i = 0; i < taskList.children.length; i++) {
        if (taskList.children[i].dataset.taskId == id) {
            taskList.children[i].remove();
            delete tasks[id];

            postUpdate(JSON.stringify(tasks));
        }
    }
}

function changeTask(id, done) {
    for (let i = 0; i < taskList.children.length; i++) {
        if (taskList.children[i].dataset.taskId == id) {
            window.test = taskList.children[i];
            taskList.children[i].querySelectorAll(".material-icons")[0].textContent = ((done) ? "done_outline" : "watch_later");
            tasks[id]["done"] = done;

            postUpdate(JSON.stringify(tasks));
        }
    }
}

function updateList() {
    for (const [key, value] of Object.entries(tasks)) {
        addTask(value.title, value.done, key);
    }
}

function postUpdate(content) {
    let request = new XMLHttpRequest();
    request.open("GET", "/update_tasks?tasks=" + content);

    request.send();
}

addTextButton.addEventListener("click", function() {
    if (addTextInput.value != "") {
        addTask(addTextInput.value, false, Math.floor(Math.random() * 100000));
    } else {

    }
});

function fetchTasksList() {
    let request = new XMLHttpRequest();
    request.open("GET", "/get_tasks");

    request.onload = function() {
        try {
            window.test = request.responseText;
            tasks = JSON.parse(request.responseText);
            updateList();
        } catch {
            tasks = {};
        }
    }

    request.send();
}   

setTimeout(function() {
    fetchTasksList()
}, 100)

