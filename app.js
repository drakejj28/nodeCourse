// Import required modules
// 'chalk' is used for styling the console output
const chalk = require('chalk');
// 'yargs' helps in creating interactive command line tools
const yargs = require('yargs');
// 'notes' is a local module containing functions for notes operations
const notes = require('./notes');

// Customize yargs version
// This sets the version of your application
yargs.version('1.1.0');

// Create add command
// This command will be used to add a new note
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true, // This means the title option for the command is required
            type: 'string' // This means the title must be a string
        },
        body: {
            describe: 'Note body',
            demandOption: true, // This means the body option for the command is required
            type: 'string' // This means the body must be a string
        }
    },
    handler (argv) {
        // This function will add a new note
        // It takes the title and body as arguments
        notes.addNote(argv.title, argv.body);
    }
});

// Create remove command
// This command will be used to remove a note
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true, // This means the title option for the command is required
            type: 'string' // This means the title must be a string
        }
    },
    handler (argv) {
        // This function will remove a note
        // It takes the title as an argument
        notes.removeNote(argv.title);
    }
});

// Create list command
// This command will be used to list all notes
yargs.command({
    command: 'list',
    describe: 'Lists your notes',
    handler () {
        // This function will list all notes
        notes.listNotes();
    }
});

// Create a read command
// This command will be used to read a note
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true, // This means the title option for the command is required
            type: 'string' // This means the title must be a string
        }
    },
    handler (argv) {
        // This function will read a note
        // It takes the title as an argument
        notes.readNote(argv.title);
    }
});

// This is used to parse the arguments
// It must be called after all the commands have been defined
yargs.parse();

// This line can be used for debugging purposes
// It will log the parsed arguments to the console
// console.log(yargs.argv);




