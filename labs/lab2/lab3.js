"use strict";

const dayjs = require("dayjs");
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
const it = require('dayjs/locale/it');

class Task {
    constructor(id, description, urgent = false, private = true, deadline = null) {
        this.id = id;
        this.description = description;
        this.urgent = urgent;
        this.private = private;
        this.deadline = deadline && dayjs(deadline, "DD/MM/YYYY", "it");
    }

    get toString() {
        return [this.description, this.deadline.format()];
    }

    get isUrgent() {
        return this.urgent;
    }

    get isPrivate() {
        return this.private;
    }

    formatDate() {
        if (this.deadline === null) {
            return "None";
        } else {
            return this.deadline.format('DD/MM/YYYY');
        }
    }

    createTaskNode() {
        //create a <li> element in HTML
        let node = document.createElement("li");
        node.className = "d-flex justify-content-between ms-5 me-5 ps-5 pe-5";
        if (this.isPrivate()) {
            node.classList.add("private");
        }
        if (this.isUrgent()) {
            node.classList.add("important");
        }
        node.innerHTML = `<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
        <label class="form-check-label" for="flexCheckDefault">
          ${this.description}
        </label>
        <small> Date: ${this.formatDate()}</small>`;
        return node;
    }

    dateDiff(date) {
        return this.deadline.diff(date, 'day');
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
            return this.tasks.filter(element => element.isPrivate());
        } else if (condition === 'urgent') {
            return this.tasks.filter(element => element.isUrgent());
        }
    }

    addTaskNodes() {
        let taskList = document.querySelector(".list-Task");
        this.tasks.forEach(t => taskList.appendChild(t.createTaskNode()));
    }
}

function init() {
    let taskManager = new TaskManager();
    //add the tasks saved in tasks.js
    TASKS.forEach(t => taskManager.add(new Task(t[0], t[1], t[2], t[3], t[4])));
    taskManager.addTaskNodes();
}

function main() {
    let addButton = document.getElementById("addButton");
    addButton.addEventListener("click", event => init());
}
main();