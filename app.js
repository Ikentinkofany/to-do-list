const express = require("express");
const date = require(__dirname + "/date.js");
const app = express();
const port = 3000;

const tasks = [];
const works = [];

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    const day = date.getDay();
    res.render("list", {listTitle: day, tasks: tasks});
});

app.post("/", function(req, res) {
    const item = req.body.task;
    if(req.body.listItem === "Work") {
        works.push(item);
        res.redirect("/work");
    } else {
        tasks.push(item);
        res.redirect("/");
    }
});

app.get("/work", (req, res) => {
    res.render("list", {listTitle: "Work", tasks: works});
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.listen(port, function() {
    console.log("Server started on port: " + port);
});