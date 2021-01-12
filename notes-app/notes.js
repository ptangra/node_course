const fs = require('fs')
const { array } = require('yargs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
    if(!duplicateNote){
        notes.push({
            title: title,
            body: body,
        })
        saveNotes(notes)
        console.log(chalk.green.inverse("New note added!"))
    }else{
        console.log(chalk.red.inverse('Note title taken'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const findNote = notes.filter((note) => note.title !== title)

    saveNotes(findNote)
    if(findNote.length === notes.length){
        const error = chalk.red.inverse('No note found!')
        console.log(error)
    }else{
        const success = chalk.green.inverse('Note removed!')
        console.log(success)
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue.inverse.bold('Your Notes\n'))
    notes.forEach(note => {
        console.log(note.title)
    });
}

const readNote = (title) => {
    const notes = loadNotes()
    const foundNote = notes.find((note) => note.title === title)
    if(foundNote){
            console.log(chalk.underline(foundNote.title))
            console.log(foundNote.body)
    } else{
        console.log(chalk.red.inverse('No note found!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e){
        return []
    }
}


module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}