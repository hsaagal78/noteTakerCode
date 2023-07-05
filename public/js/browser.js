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
              <button class="modalM_btn">&#9998;</button>
            </div>
          </div>
        `);
      });
    });
}

outputNotes();
const container = document.querySelector('.contain');
container.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal_btn')) {
        const noteId = event.target.getAttribute('data-note-id');
        const deletedNote = document.querySelector(`[data-note-id="${noteId}"]`);
        deletedNote.parentNode.remove();
        handleDeleteNote(noteId);
        
    }
});


function handleDeleteNote(noteId) {
    
    console.log('aqui:',noteId);

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
