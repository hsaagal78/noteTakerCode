const express = require('express');
const { Note,getNotes } = require('./lib/Note');
const path = require ('path')


const app = express();

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.get('/public/css/style.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'public', 'css', 'style.css',));
  });
  app.get('/public/css/jass.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'public', 'css', 'jass.css',));
  });


// Load Routes

// Post route to retrieve the form data
app.post('/notes', (clientReq, serverRes) => {

  const newNote = new Note(clientReq.body.note);
  // console.log(clientReq.body);
  newNote.save();

  // Respond back to the client to complete the request
  serverRes.redirect('/');
});
app.get('/notes',(clientReq,serverRes) => {
  const notes = getNotes();

  serverRes.send(notes);
});

app.delete('/notes/:id', (clientReq, serverRes) => {
  
  // console.log(clientReq.params.id);
  const noteId = clientReq.params.id;
  const note = new Note();
  note.noteDelete(noteId)
  serverRes.send({ message: 'Note deleted successfully!' });
  
});

app.listen(3333, () => console.log('Server started on port 3333.'));





