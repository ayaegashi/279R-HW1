// Creates an instance of the Mongoose class and stores it in the mongoose variable
const mongoose = require('mongoose');

// Define the abstract shape of a todo task in the database
// TodoTask will consist of content and date fields
const todoTaskSchema = new mongoose.Schema({
    content: {
        type: String,
        // In order to create a new todo task, must include the content
        required: true
    },
    date: {
        type: Date,
        // Automatically store date that todo task was created
        default: Date.now
    }
})

// Export the model so that it can be referenced in index.js
module.exports = mongoose.model('TodoTask', todoTaskSchema);