'use strict';

// # EX 0:
// ## func(spring) => spng (if < 2 return empty)
/*
let readline = require("readline");
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});

rl.on('line', (input) => {
    if (input.length < 2) {
        console.log("Result: ")
    } else {
        start = input.slice(0, 2)
        end = input.slice(-2);
        result = start + end;
        console.log(`Result: ${result}`);
    }
    return;
});
*/
// # EX 1:
// ## OOP for tasks objects using Functional Programming

const dayjs = require("dayjs");
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
const it = require('dayjs/locale/it');
/*
function Task(id, description, urgent = false, isPrivate = true, deadline = null) {
    //important, any declaration of attributes or methods must be this.x
    if (typeof id !== "number") {
        return null;
    }
    this.id = id;
    this.description = description;
    this.urgent = urgent;
    this.isPrivate = isPrivate;
    this.deadline = deadline && dayjs(deadline, "DD/MM/YYYY", "it"); //if not falsy (empty), store as dayjs object. Opposite to a || b (if a is null, default b, o/w a)

    this.toString = function() {
        if (this.deadline !== null) {
            console.log(`Id: ${this.id}\n Desc: ${this.description}\n Urgent: ${this.urgent}\n Private: ${this.isPrivate}\n Deadline: ${this.deadline.format('DD/MM/YYYY')}`);
        } else {
            console.log(`Id: ${this.id}\n Desc: ${this.description}\n Urgent: ${this.urgent}\n Private: ${this.isPrivate}\n Deadline: None`);
        }
    }
}

function TaskManager() {
    this.tasks = [];

    // add a task
    this.add = function(...tasks) {
        tasks.filter(task => task !== null).forEach(task => {
            this.tasks.push(task);
        });
        return;
    };

    // sort by deadline and print
    this.sortAndPrint = function() {
        let withDate = [];
        withDate = this.tasks.filter((t) => t.deadline === null ? false : true);

        let noDate = [];
        noDate = this.tasks.filter((t) => t.deadline === null ? true : false);

        withDate.sort(function(a, b) {
            return a.deadline.diff(b.deadline);
        });

        console.log("***** Sorted and print *****\n");

        let taskList = withDate.concat(noDate);
        taskList.forEach(element => {
            element.toString();
        });
        return;
    };
    //filter tasks if urgent
    this.filterAndPrint = function() {
        let filtered = this.tasks.filter(element => {
            return element.urgent;
        });
        console.log("***** Filtered and print *****\n")
        filtered.forEach(element => {
            element.toString();
        });
        return;
    };
}

function main() {
    let task1 = new Task(1, 'first', false, true, "12/12/2021");
    let task2 = new Task(2, 'second', true, false);
    let task3 = new Task(3, 'third', false, false, "11/12/2021");
    let task4 = new Task("wrong", "wrong");

    let manager = new TaskManager();
    manager.add(task1, task2, task3, task4);

    manager.sortAndPrint();
    manager.filterAndPrint();
    return;
}

main();
*/