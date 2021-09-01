// Fake Tasks
//dayjs
//import dayjs from 'dayjs';
const dayjs = require("dayjs");
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
const it = require('dayjs/locale/it');

const TASKS = [
    { id: 1, description: "Complete BigLab 1C", important: false, isPrivate: true, deadline: dayjs("08-09-2021", "DD-MM-YYYY")},
    { id: 2, description: "Study for BigLab 1C", important: true, isPrivate: true, deadline: dayjs("08-09-2022", "DD-MM-YYYY")},
    { id: 3, description: "Buy some groceries", important: false, isPrivate: false, deadline: dayjs("08-09-2022", "DD-MM-YYYY")},
    { id: 4, description: "Read a good book", important: true, isPrivate: true, deadline: null},
    { id: 5, description: "Watch Mr. Robot", important: false, isPrivate: true, deadline: dayjs("08-09-2021", "DD-MM-YYYY")},
    { id: 6, description: "Buy some flowers", important: true, isPrivate: false, deadline: dayjs() }, // today task
    { id: 7, description: "Football match", important: true, isPrivate: false, deadline: dayjs().add(4, 'day') }, // next 7 days task
  ];

  export default TASKS;