const express = require("express");
const bodyParser = require("body-parser");
const dateUtils = require(__dirname + "/date-utils.js");
const todoListDBAdapter = require(__dirname + "/todo-list-db-adapter.js");
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("public"));

const defaultTodoListCollectionName = "Default";

app.get("/", (req, res) => {
    todoListDBAdapter.getTodoList(defaultTodoListCollectionName)
    .then(function(todoList) {
        //console.log(todoList);
        if (0 === todoList.length) {
            todoListDBAdapter.initDefaultTodoList(defaultTodoListCollectionName)
            .then(function(initiatedTodoList) {
                //console.log(initiatedTodoList);
                res.redirect("/");
            });
        } else {
            res.render("list", {
                listEJSListTitle: dateUtils.getTodayStr(), 
                listEJSToDoItems: todoList, 
                listEJSRoutePath: req.path,
                listEJSCollectionName: defaultTodoListCollectionName
            });
        }
    })
    .catch(function(err) {
        if (err) {
            res.status(500).send(`Internal server error! ${err}`);
        }
    });
})

app.post("/", (req, res) => {
    todoListDBAdapter.insertItemToTodoList(defaultTodoListCollectionName, req.body.toDoItem)
    .then(function() {
        res.redirect(req.path);
    });
});

app.post("/delete", (req, res) => {
    const actionId = req.body.checkbox;
    const listName = req.body.listName;

    todoListDBAdapter.removeItemFromTodoList(listName, actionId)
    .then(function() {
        if (defaultTodoListCollectionName === listName) {
            res.redirect("/");
        } else {
            res.redirect(`/list/${listName}`);
        }
    })
    .catch(function(err) {
        res.status(500).send("Internal server error!");
    });
});

app.get("/list/:listName", (req, res) => {
    const listName = _.kebabCase(req.params["listName"]);

    todoListDBAdapter.getTodoList(listName)
    .then(function(todoList) {
        //console.log(todoList);
        if (0 === todoList.length) {
            todoListDBAdapter.initDefaultTodoList(listName)
            .then(function(initiatedTodoList) {
                //console.log(initiatedTodoList);
                res.redirect(req.path);
            });
        } else {
            res.render("list", {
                listEJSListTitle: dateUtils.getTodayStr(), 
                listEJSToDoItems: todoList, 
                listEJSRoutePath: req.path,
                listEJSCollectionName: listName
            });
        }
    })
    .catch(function(err) {
        if (err) {
            res.status(500).send(`Internal server error! ${err}`);
        }
    });
})

app.post("/list/:listName", (req, res) => {
    const listName = _.kebabCase(req.params["listName"]);
    todoListDBAdapter.insertItemToTodoList(listName, req.body.toDoItem).then(function() {
        res.redirect(req.path);
    });
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.listen(3000, () => {
    console.log("ToDo List server starts to serve at port 3000.");
})