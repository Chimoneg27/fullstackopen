import { useState } from 'react'
import Note from './Components/Note'

function App() {
  const [notes, setNotes] = useState(notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const addNote = (e) => {
    e.preventDefault()
    // prevent the default submission which causes the page to refresh
    const noteObj = {
      content: newNote,
      important: Math.random < 0.5,
      id: String(notes.length + 1)
    }
    // this is the contents of the newly created note

    setNotes(notes.concat(noteObj))
    /* 
    The method does not mutate the original notes array, but rather 
    creates a new copy of the array with the new item added 
    to the end. This is important since we must never mutate 
    state directly in React!
    */
    //here we concat/add the new note to the existing notes array
    setNewNote('')
    //turns the input field blank after submission
  }

  const handleNoteChange = (e) => {
    setNewNote(e.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)
  return (
    <div>
      <h1>Notes</h1>

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>

      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>

      <form onSubmit={addNote}>
      <input value={newNote} onChange={handleNoteChange}/>
      <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App
