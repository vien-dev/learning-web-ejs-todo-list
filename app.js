const express = require("express");
const bodyParser = require("body-parser");
const date_utils = require(__dirname + "/date-utils.js");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("public"));

var toDoItems = ["Sleep", "Code", "Love"];
var toDoWorkItems = [];

app.get("/", (req, res) => {
    res.render("list", {listEJSListTitle: date_utils.getTodayStr(), listEJSToDoItems: toDoItems, listEJSRoutePath: req.path});
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