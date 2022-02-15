const yargs = require("yargs")
const note =  require("./notes.js")


yargs.version("1.1.0")

//create add command
yargs.command({
    command:"add",
    describe : "Adding new notes",
    builder:{ // the way of passing the options to the command
        title:{
            describe : "The Title",
            demandOption : true,
            type:"string"
        },
        body:{
            describe:"Note body",
            demandOption:true,
            type:"string"
        }
    }
    ,
    handler(argv){
        note.addNotes(argv.title , argv.body)
    }
})


// create remove command
yargs.command({
    command:"remove",
    describe : "Remove  notes",
    builder:{
        title:{
            describe:"Note will removed",
            demandOption:true,
            type:"string"
        }
    },
    handler(argv){
        note.remove(argv.title)
    }
})

// create list command
yargs.command({
    command:"list",
    describe : "List all  notes",
    handler(){
        note.list()
    }

})

// create read command
yargs.command({
    command:"read",
    describe : "Read the note notes",
    builder:{
        title:{
            describe:"My Title",
            demandOption:true,
            type:"string"
        }
    },
    handler(argv){
        note.read(argv.title)
    }
})
console.log(yargs.parse());
