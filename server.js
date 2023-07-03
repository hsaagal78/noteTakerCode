const express = require('express');
const Note = require('./lib/Note');
const path = require ('path')

const app = express();

app.use(express.static('./public/html'));
app.get('/public/css/style.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'public', 'css', 'style.css',));
  });
  app.get('/public/css/jass.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'public', 'css', 'jass.css',));
  });
app.use(express.urlencoded({ extended: false }));

// Load Routes

// Post route to retrieve the form data
app.post('/notes', (clientReq, serverRes) => {

  const newNote = new Note(clientReq.body.note);

  newNote.save();

  // Respond back to the client to complete the request
  serverRes.redirect('/');
});

app.listen(3333, () => console.log('Server started on port 3333.'));





