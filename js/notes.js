document.addEventListener('DOMContentLoaded', function() {
    let currentNoteIndex = null; // Track the index of the currently edited note

    // Function to load notes from localStorage
    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        const notesContainer = document.getElementById('notes');
        notesContainer.innerHTML = '';

        notes.forEach((note, index) => {
            const noteCard = document.createElement('div');
            noteCard.className = 'card note-item';

            const noteHeader = document.createElement('div');
            noteHeader.className = 'card-header d-flex justify-content-between align-items-center';
            noteHeader.innerHTML = `<strong>${note.title}</strong>`;

            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-sm btn-danger';
            deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 5h4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5H6a.5.5 0 0 1-.5-.5v-7zM4.118 4a1 1 0 0 1 .876-.5h6.012a1 1 0 0 1 .876.5H13.5a.5.5 0 0 1 0 1h-1v8a2 2 0 0 1-2 2H5.5a2 2 0 0 1-2-2V5h-1a.5.5 0 0 1 0-1h1.118zM5.5 4a.5.5 0 0 1-.5-.5V3h6v.5a.5.5 0 0 1-.5.5h-5z"/></svg>';
            deleteButton.onclick = function(event) {
                event.stopPropagation(); // Prevent triggering the note click event
                deleteNoteToTrash(index);
            };

            noteHeader.appendChild(deleteButton);

            const noteBody = document.createElement('div');
            noteBody.className = 'card-body';
            noteBody.textContent = note.content;

            noteCard.appendChild(noteHeader);
            noteCard.appendChild(noteBody);
            notesContainer.appendChild(noteCard);

            // Add click event listener to populate the note editor
            noteCard.addEventListener('click', function() {
                populateNoteEditor(note, index);
            });
        });
    }

    // Function to delete a note
    function deleteNoteToTrash(index) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.splice(index, 1);

        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes();
    }

    // Function to add or update a note
    function addNote() {
        const title = document.getElementById('note-title').value.trim();
        const content = document.getElementById('note-content').value.trim();

        if (title === '' || content === '') {
            document.getElementById('error').style.display = 'block';
            document.getElementById('message').style.display = 'none';
            return;
        }

        const notes = JSON.parse(localStorage.getItem('notes')) || [];

        if (currentNoteIndex !== null) {
            // Update existing note
            notes[currentNoteIndex] = { title, content };
        } else {
            // Add new note
            notes.push({ title, content });
        }

        localStorage.setItem('notes', JSON.stringify(notes));

        document.getElementById('note-title').value = '';
        document.getElementById('note-content').value = '';
        document.getElementById('message').style.display = 'block';
        document.getElementById('error').style.display = 'none';

        // Reset the button text to "Guardar nota"
        document.getElementById('save-button').textContent = 'Guardar nota';

        currentNoteIndex = null; // Reset the index after saving
        loadNotes();
    }

    // Function to populate the note editor with the selected note
    function populateNoteEditor(note, index) {
        document.getElementById('note-title').value = note.title;
        document.getElementById('note-content').value = note.content;
        currentNoteIndex = index; // Set the current note index

        // Change the button text to "Update Note"
        document.getElementById('save-button').textContent = 'Actualitzar nota';
    }

    // Load notes when the page is loaded
    loadNotes();

    // Make the functions available globally
    window.loadNotes = loadNotes;
    window.addNote = addNote;
    window.deleteNoteToTrash = deleteNoteToTrash;
    window.populateNoteEditor = populateNoteEditor;
});
