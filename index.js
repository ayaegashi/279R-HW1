// Express is a nodeJS module
// The require function is provided by NodeJS. The function loads modules and gives you access to their exports.
// We can now access express functionality through the express variable
const express = require("express");
// This puts a new Express application into the variable app
const app = express();
// Loads the environment variables from .env file
// Note that the .env file creates the config variable DB_CONNECT to connect the MongoDB database
const dotenv = require("dotenv");
// Creates an instance of the Mongoose class and stores it in the mongoose variable
const mongoose = require("mongoose");

// Models
// A model is the abstraction of the data that is going to go into the MongoDB database
// TodoTask defines the abstract form of a new todo item
const TodoTask = require("./models/TodoTask");

// Configures the dotenv package
dotenv.config();

// Accessing the css stylesheet, which is stored in the "public" folder
app.use("/static", express.static("public"));

// Urlencoded will allow us to extract the data from the form by adding it to the body property of the request
app.use(express.urlencoded({ extended: true }));

// Connection to db
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log("Connected to db!");
    // process.env.PORT is necessary to bind my web server to the dynamic PORT environment 
    // variable set by Heroku, instead of hard-coding (as in the tutorial)
    // (source: Mark Keller on Slack)
    app.listen(process.env.PORT || 3000, () => console.log("Server up and running"));
});

// View engine configuration
app.set("view engine", "ejs");

// GET METHOD
// Renders the todo page
app.get("/", (req, res) => {
    // .find() finds all instances that match the model
    TodoTask.find({}, (err, tasks) => {
        // sends todo items stored in tasks to the todoTasks variable in todo.ejs, so they can be displayed
        res.render("todo.ejs", { todoTasks: tasks });
    });
});

// POST method
// Receives the user's input and creates a new todo task
app.post('/', async (req, res) => {
    // Create a new todo item by creating a new instance of TodoTask defined in the models folder
    const todoTask = new TodoTask({
        content: req.body.content
    });
    try {
        // Try to save the newly created TodoTask in MongoDB
        await todoTask.save();
        res.redirect("/");
    } catch (err) {
        // If object can't be stored do nothing
        res.redirect("/");
    }
});

// UPDATE
// Allow users to edit todo items
app
    .route("/edit/:id") // When a user clicks on the edit icon, they will be routed to /edit/id where the id is the todo item's id in the database
    .get((req, res) => { // Render edit page, as defined in todoEdit.js
        const id = req.params.id;
        TodoTask.find({}, (err, tasks) => {
            // Pass the list of tasks as well as the id of the item to be edited to todoEdit.ejs
            res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
        });
    })
    .post((req, res) => { // Update the task in the database with new information
    const id = req.params.id;
    // findByIdAndUpdate is a Mongoose function that finds an item in the database by its id and updates it
    TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});

// DELETE
app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    // findByIdAndRemove is another Mongoose function that finds an item by its id in the database and removes it
    TodoTask.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});