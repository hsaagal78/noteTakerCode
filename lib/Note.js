const fs = require('fs');
const { v4 } = require('uuid');
const path = require('path');
const DB_PATH = path.join(__dirname, '../lib/notes.json');

//This function getNotes() is defined to read the notes.json file and parse its contents into a JavaScript object
function getNotes() {
  try {
    const notes = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    return notes;
    
  } catch (err) {
    return [];
  }
}
//This code defines a class Note with a constructor and several methods
//sending, updating and deleting data to json file.
class Note {
  constructor(text,title) {
    this.id = v4();
    this.text = text;
    this.title = title;
  }

  save() {
    const notes = getNotes();
    notes.push(this);
    fs.writeFile(DB_PATH, JSON.stringify(notes, null, 2), err => {
      if (err) throw err;
      console.log('Note saved successfully!');
    });
  }

  noteDelete(noteId) {
    const notes = getNotes();
    const updatedNotes = notes.filter(note => note.id !== noteId);
    fs.writeFile(DB_PATH, JSON.stringify(updatedNotes, null, 2), err => {
      if (err) throw console.error('Error deleting note:', err);
      console.log('Note deleted successfully!');
    });
  }

  updateNote(updatedText,noteId) {
    console.log(updatedText);
    const notes = getNotes();
    const noteToUpdate = notes.find(note => note.id === noteId);
    if (noteToUpdate) {
      noteToUpdate.text = updatedText;
      fs.writeFile(DB_PATH, JSON.stringify(notes, null, 2), err => {
        if (err) throw err;
        console.log('Note updated successfully!');
      });
    } else {
      console.error('Note not found!');
    }
  }
}

module.exports = {Note: Note, getNotes: getNotes };

