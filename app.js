const express = require("express");
const bodyParser = require("body-parser");
const dayjs = require('dayjs');
const weekOfYear = require('dayjs/plugin/weekOfYear')

dayjs.extend(weekOfYear);

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }))

var toDoItems = [];

function getTodayStr() {
    var today = new Date();
    var todayOptions = {weekday: "long", day: "numeric", month: "long", year: "numeric"};
    var currentWeekNumber = dayjs().week();

    return `Week ${currentWeekNumber}: ${today.toLocaleString("default", todayOptions)}`;
}

function renderResponseForMainRoute(res) {
    res.render("list", {listEJSDay: getTodayStr(), listEJSToDoItems: toDoItems});
}

app.get("/", (req, res) => {
    renderResponseForMainRoute(res);
})

app.post("/", (req, res) => {
    toDoItems.push(req.body.toDoItem);

    renderResponseForMainRoute(res);
});

app.listen(3000, () => {
    console.log("ToDo List server starts to serve at port 3000.");
})