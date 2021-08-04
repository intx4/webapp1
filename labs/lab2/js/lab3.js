"use strict";

class Task {
    constructor(id, description, urgent = false, priv = true, deadline = null) {
        this.id = id;
        this.description = description;
        this.urgent = urgent;
        this.priv = priv;
        this.deadline = deadline && dayjs(deadline);
    }

    get toString() {
        return [this.description, this.deadline.format()];
    }

    get isUrgent() {
        return this.urgent;
    }

    get isPrivate() {
        return this.priv;
    }

    formatDate() {
        if (this.deadline === null) {
            return "None";
        } else {
            return this.deadline.format('MM/DD/YYYY');
        }
    }

    createTaskNode() {
        //create a <li> element in HTML
        let node = document.createElement("li");
        node.className = "d-flex justify-content-between ms-5 me-5 ps-5 pe-5";
        if (this.isPrivate) {
            node.classList.add("private");
        }
        if (this.isUrgent) {
            node.classList.add("important");
        }
        node.innerHTML = `<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
        <label class="form-check-label" for="flexCheckDefault">
          ${this.description}
        </label>
        <small class="date" > Date: ${this.formatDate()}</small>`;
        return node;
    }
}

class TaskManager {
    constructor() {
        this.tasks = [];
    }

    add(...tasks) {
        for (let task of tasks) {
            this.tasks.push(task);
        }
    }

    filter(condition) {
        if (condition === 'private') {
            return this.tasks.filter(element => element.isPrivate);
        } else if (condition === 'urgent') {
            return this.tasks.filter(element => element.isUrgent);
        }
    }

    addTaskNodes() {
        let taskList = document.getElementById("taskList");
        this.tasks.forEach(t => taskList.appendChild(t.createTaskNode()));
    }
}

function init() {
    let taskManager = new TaskManager();
    //add the tasks saved in tasks.js
    TASKS.forEach(t => taskManager.add(new Task(t[0], t[1], t[2], t[3], t[4])));
    taskManager.addTaskNodes();
}

function enableFilter(active) {
    const filterList = document.getElementById("filters");
    let filters = filterList.children;
    for (let filter of filters) {
        if (filter.id === active) {
            filter.classList.toggle("active");
        } else {
            filter.classList.remove("active");
        }
    }
}

function displayAll() {
    enableFilter("All");
    let taskList = document.getElementById("taskList");
    let tasks = taskList.children;
    for (let task of tasks) {
        task.classList.remove("d-none");
    }
}

function displayPrivate() {
    enableFilter("Private");
    let taskList = document.getElementById("taskList");
    let tasks = taskList.children;
    for (let task of tasks) {
        let found = false;
        for (let value of task.classList.values()) {
            if (value === "private") {
                found = true;
                break;
            }
        }
        if (!found) {
            task.classList.add("d-none");
        } else {
            task.classList.remove("d-none");
        }
    }
}

function displayUrgent() {
    enableFilter("Important");
    let taskList = document.getElementById("taskList");
    let tasks = taskList.children;
    for (let task of tasks) {
        let found = false;
        for (let value of task.classList.values()) {
            if (value === "important") {
                found = true;
                break;
            }
        }
        if (!found) {
            task.classList.add("d-none");
        } else {
            task.classList.remove("d-none");
        }
    }
}

function displayDate(diff) {
    if (diff === 1) {
        enableFilter("Today");
    } else if (diff === 7) {
        enableFilter("Next7");
    }
    let taskList = document.getElementById("taskList");
    let tasks = taskList.children;
    let today = dayjs();
    for (let task of tasks) {
        let date = task.querySelector(".date");
        date = date.innerText.split(":")[1].substring(1);
        if (date === "None") {
            task.classList.add("d-none");
        } else {
            date = dayjs(date);
            if (diff === 1) {
                if (today.diff(date, 'day') !== 0) {
                    task.classList.add("d-none");
                } else {
                    task.classList.remove("d-none");
                }
            } else if (diff === 7) {
                if (date.diff(today, 'day') > diff || date.diff(today, 'day') < 0) {
                    task.classList.add("d-none");
                } else {
                    task.classList.remove("d-none");
                }
            }
        }
    }
}

function main() {
    //populate via button interaction
    const addButton = document.getElementById("addButton");
    addButton.addEventListener("click", event => init());

    //add eventListeners for filters
    const filterAll = document.getElementById("All");
    filterAll.addEventListener("click", event => displayAll());

    const today = document.getElementById("Today");
    today.addEventListener("click", event => displayDate(1));

    const next7 = document.getElementById("Next7");
    next7.addEventListener("click", event => displayDate(7));

    const priv = document.getElementById("Private");
    priv.addEventListener("click", event => displayPrivate());

    const urgent = document.getElementById("Important");
    urgent.addEventListener("click", event => displayUrgent());
}
main();