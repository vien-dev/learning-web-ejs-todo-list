const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    day = new Date().toLocaleString("default", {weekday: "long"});
    
    res.render("list", {nameOfDay: day});
})

app.listen(3000, () => {
    console.log("ToDo List server starts to serve at port 3000.");
})