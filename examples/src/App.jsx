import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './Components/Note'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        setNotes(response.data)
      }, [])
  })

  const addNote = (e) => {
    e.preventDefault()

    const noteObj = {
      content: newNote,
      important: Math.random() > 0.5,
    }
    
    axios
      .post('http://localhost:3001/notes', noteObj)
      .then(response => {
        setNotes(notes.concat(response.data))
        setNewNote('')
      })
  }

  const handleNoteChange = (e) => {
    setNewNote(e.target.value)
  }

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    // Here we use the find() array method to target the note with the specific id
  
    const changedNote = { ...note, important: !note.important }
    // Here we create a new note object with the same properties as the original note,
    // but with the 'important' property toggled (true to false or vice-versa)
  
    axios.put(url, changedNote).then(response => {
      // The put method sends a request to update the note at the specified URL with the changedNote object
      // Once the request is successful, we update our local state
  
      setNotes(notes.map(n => n.id !== id ? n : response.data))
      // We use the map() array method to create a new array of notes
      // If the note's id does not match the id we are toggling, we keep it unchanged
      // If the note's id matches, we replace it with the updated note from the server response
    })
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
          <Note 
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
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
