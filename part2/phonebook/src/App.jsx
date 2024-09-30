import { useState } from 'react'

function App() {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas'}
  ])
  const [newName, setNewName] = useState('')

  const submitName = (e) => {
    e.preventDefault()

    const nameInPhonebook = persons.some((obj) => obj.name === newName)

    if(nameInPhonebook === true) {
      return alert(`${newName} is already in the phonebook`)
    }

    setPersons(persons.concat({
      name: newName
    }))
    setNewName('')
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>

        <div>
          <button type="submit" onClick={submitName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      <ul>
        {persons.map((person) => {
          return <li key={person.name}>{person.name}</li>
        })}
      </ul>
      <div>
        </div>
    </div>
  )
}

export default App
