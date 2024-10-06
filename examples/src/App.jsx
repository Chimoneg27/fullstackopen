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
    // prevent the default submission which causes the page to refresh
    const noteObj = {
      content: newNote,
      important: Math.random < 0.5,
    }
    
    axios
      .post('http://localhost:3001/notes', noteObj)
      .then(response => {
        console.log(response)
      })
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
