const fs = require("fs")
const chalk = require("chalk")


const addNotes = (title , body)=>{
    //we wanna load the old notes first and add the new notes to them
    const notes = loadNotes()
    //to check if the title is already exist before
    const duplicate = notes.filter(note => note.title === title)

    // debugger
    
    if(duplicate.length === 0){
        notes.push({
            title: title,
            body : body
        })
        savaNotes(notes)
        console.log(`${chalk.green.inverse("Note Saved")}`);
    }else{
        console.log(`this title ${chalk.red.inverse(title)}  is taken ,choose another one`);
    }

}

const removeNotes = (title) =>{
    const allNotes = loadNotes()
    const notesToKeep = allNotes.filter(note =>note.title !== title)
    
    if(allNotes.length > notesToKeep.length){
        console.log(`${chalk.green.inverse("Note Removed Successfully")}`);
    }else{
        console.log(`${chalk.red.inverse("No Note Found")}`);
    }
    savaNotes(notesToKeep)
}

const listNotes = () =>{
    console.log(`${chalk.gray.inverse("Your Notes ..")}`);
    const notes = loadNotes()
    notes.forEach((note)=>{
        console.log(`${chalk.yellow.inverse(note.title)}`);

    })
}

const readNote = (title) =>{
    const allNotes = loadNotes()
    const noteWithThisTitle = allNotes.find(note=>note.title === title)

    if(noteWithThisTitle){
        console.log(`${chalk.italic.green.inverse(noteWithThisTitle.title)} `)
        console.log(`${chalk.bold.yellow.inverse(noteWithThisTitle.body)}`);
    }else{
        console.log(`${chalk.red.inverse("Note Not Exist")}`);
    }


}

const savaNotes = (notes) =>{
    //this function takes an array or json and use stringify and then store it  to the file system
    const data = JSON.stringify(notes)
    fs.writeFileSync("notes.json" , data)

}
const loadNotes = () =>{
    //this will work only if the file exists and contain json
    //so the best approach is to write defensive code
    try {
        const bufferData =  fs.readFileSync("notes.json")
        return JSON.parse(bufferData)
        
    } catch (error) {
        return []
    }
}



module.exports = {
    addNotes : addNotes,
    remove   :removeNotes,
    list     :listNotes,
    read      :readNote
}