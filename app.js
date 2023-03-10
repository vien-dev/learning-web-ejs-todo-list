const express = require("express");
const bodyParser = require("body-parser");
const dayjs = require('dayjs');
const weekOfYear = require('dayjs/plugin/weekOfYear')

dayjs.extend(weekOfYear);

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("public"));

var toDoItems = ["Sleep", "Code", "Love"];
var toDoWorkItems = [];

function getTodayStr() {
    var today = new Date();
    var todayOptions = {weekday: "long", day: "numeric", month: "long", year: "numeric"};
    var currentWeekNumber = dayjs().week();

    return `Week ${currentWeekNumber}: ${today.toLocaleString("default", todayOptions)}`;
}

app.get("/", (req, res) => {
    res.render("list", {listEJSListTitle: getTodayStr(), listEJSToDoItems: toDoItems, listEJSRoutePath: req.path});
})

app.post("/", (req, res) => {
    toDoItems.push(req.body.toDoItem);

    res.redirect(req.path);
});

app.get("/work", (req, res) => {
    res.render("list", {listEJSListTitle: "Work", listEJSToDoItems: toDoWorkItems, listEJSRoutePath: req.path});
})

app.post("/work", (req, res) => {
    toDoWorkItems.push(req.body.toDoItem);

    res.redirect(req.path);
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.listen(3000, () => {
    console.log("ToDo List server starts to serve at port 3000.");
})