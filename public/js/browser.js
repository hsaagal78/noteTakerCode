const outputE1 = document.querySelector('#saveNote');

function outputNotes() {
  fetch('/notes')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      outputE1.innerHTML = '';
      data.forEach(noteObj => {
        outputE1.insertAdjacentHTML('beforeend', `
          <div class="modal-contner">
            <div class="modal">
              <button class="modal_btn" data-note-id="${noteObj.id}">&times;</button>
              <h3 class="modal_body">${noteObj.text}</h3>
              <h3 class="modal_id">${noteObj.id}</h3>
              <button class="modalM_btn" data-update-id="${noteObj.id}" data-modal-update-body='${noteObj.text}'>&#9998;</button>
            </div>
          </div>
        `);
      });
    });
}

outputNotes();

const deleteNoteContainer = document.querySelector('.contain');
deleteNoteContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal_btn')) {
    const noteId = event.target.getAttribute('data-note-id');
    const deletedNote = document.querySelector(`[data-note-id="${noteId}"]`);
    deletedNote.parentNode.remove();
    handleDeleteNote(noteId);
  }
});

const updateNoteContainer = document.querySelector('.updateNote');
updateNoteContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('modalM_btn')) {
    const noteId = event.target.getAttribute('data-update-id');
    
    handleUpdateNote(noteId);
  }
});

function handleDeleteNote(noteId) {
  fetch(`/notes/${noteId}`, {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(data => {
      console.log('Note deleted successfully:', data.message);
      outputNotes();
    })
    .catch(err => {
      console.error('Error deleting note:', err);
    });
}

function handleUpdateNote(noteId) {
  const noteToUpdate = document.querySelector(`[data-update-id="${noteId}"]`);
  const newnoteToUpdate = noteToUpdate.querySelector('.modal_body');
  const currentText = noteToUpdate.dataset.modalUpdateBody;

  const newText = window.prompt('Enter the new note text:', currentText);
 
  if (newText) {
    
      fetch(`/notes/${noteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text:newText })
    })
      .then(res => res.json())
      .then(data => {
        console.log('Note updated successfully:', data.message);
        newnoteToUpdate.innerText = newText;
        outputNotes();
      })
      .catch(err => {
        console.error('Error updating note:', err);
      });
  }
}








