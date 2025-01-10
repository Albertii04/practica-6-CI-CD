// Function to delete a note (move to trash)
function deleteNoteToTrash(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const trash = JSON.parse(localStorage.getItem('trash')) || [];

    // Move the note to the trash
    const deletedNote = notes.splice(index, 1)[0];
    trash.push(deletedNote);

    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('trash', JSON.stringify(trash));

    loadNotes();
}

// Function to load notes from the trash
function loadTrash() {
    const trash = JSON.parse(localStorage.getItem('trash')) || [];
    const trashContainer = document.getElementById('trash');
    trashContainer.innerHTML = '';

    trash.forEach((note, index) => {
        const noteCard = document.createElement('div');
        noteCard.className = 'card note-item';

        const noteHeader = document.createElement('div');
        noteHeader.className = 'card-header d-flex justify-content-between align-items-center';
        noteHeader.innerHTML = `<strong>${note.title}</strong>`;

        const restoreButton = document.createElement('button');
        restoreButton.className = 'btn btn-sm btn-success';
        restoreButton.innerHTML = 'Restore';
        restoreButton.onclick = function(event) {
            event.stopPropagation(); // Prevent triggering the note click event
            restoreNoteFromTrash(index);
        };

        noteHeader.appendChild(restoreButton);

        const noteBody = document.createElement('div');
        noteBody.className = 'card-body';
        noteBody.textContent = note.content;

        noteCard.appendChild(noteHeader);
        noteCard.appendChild(noteBody);
        trashContainer.appendChild(noteCard);
    });
}

// Function to restore a note from the trash
function restoreNoteFromTrash(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const trash = JSON.parse(localStorage.getItem('trash')) || [];

    // Restore the note from the trash
    const restoredNote = trash.splice(index, 1)[0];
    notes.push(restoredNote);

    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('trash', JSON.stringify(trash));

    loadTrash();
    loadNotes();
}

// Make the functions available globally
window.deleteNoteToTrash = deleteNoteToTrash;
window.loadTrash = loadTrash;
window.restoreNoteFromTrash = restoreNoteFromTrash;