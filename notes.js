// Importing required modules
const fs = require('fs'); // This is a built-in Node.js module for file system operations
const chalk = require('chalk'); // This is a third-party module for terminal string styling

// Function to add a new note
const addNote = (title, body) => {
    const notes = loadNotes(); // Load all existing notes
    const duplicateNote = notes.find((note) => note.title === title); // Check for duplicate note titles
    if (!duplicateNote) { // If no duplicate note is found
        notes.push({ // Add the new note to the list
            title: title,
            body: body
        });
        saveNotes(notes); // Save the updated list of notes
        console.log(chalk.green.inverse('New note added!')); // Print success message
    } else {
        console.log(chalk.red.inverse('Note title taken!')); // Print error message if note title is already taken
    }
}

// Function to remove a note
const removeNote = (title) => {
    const notes = loadNotes(); // Load all existing notes
    const notesToKeep = notes.filter((note) => note.title !== title); // Keep all notes except the one to be removed
    if (notes.length > notesToKeep.length) { // If a note was removed
        console.log(chalk.green.inverse('Note removed!')); // Print success message
        saveNotes(notesToKeep); // Save the updated list of notes
    } else {
        console.log(chalk.red.inverse('No note found!')); // Print error message if no note was found with the given title
    }
}

// Function to list all notes
const listNotes = () => {
    const notes = loadNotes(); // Load all existing notes
    console.log(chalk.inverse('Your notes')); // Print header
    notes.forEach((note) => { // For each note
        console.log(note.title); // Print the note title
    });
};

// Function to read a note
const readNote = (title) => {
    const notes = loadNotes(); // Load all existing notes
    const note = notes.find((note) => note.title === title); // Find the note with the given title
    if (note) { // If the note was found
        console.log(chalk.inverse(note.title)); // Print the note title
        console.log(note.body); // Print the note body
    } else {
        console.log(chalk.red.inverse('No note found!')); // Print error message if no note was found with the given title
    }
};

// Function to save notes
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes); // Convert the notes object to a JSON string
    fs.writeFileSync('notes.json', dataJSON); // Write the JSON string to a file
}

// Function to load notes
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json'); // Read the file
        const dataJSON = dataBuffer.toString(); // Convert the file data to a string
        return JSON.parse(dataJSON); // Convert the string to a JavaScript object and return it
    } catch (e) {
        return []; // If an error occurred (like the file doesn't exist), return an empty array
    }
}

// Exporting the functions so they can be used in other files
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}
