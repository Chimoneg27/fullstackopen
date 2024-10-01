import { useState } from 'react'

function App() {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchResult, setSearchResult] = useState('')

  const submitName = (e) => {
    e.preventDefault()

    const nameInPhonebook = persons.some((obj) => obj.name === newName)

    if(nameInPhonebook === true) {
      return alert(`${newName} is already in the phonebook`)
    }

    setPersons(persons.concat({
      name: newName,
      number: newNumber
    }))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumChange = (e) => {
    setNewNumber(e.target.value);
  };

  const filterSearch = (e) => {
    setSearchResult(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        filter shown with a: <input 
          type="text"
          value={searchResult}
          onChange={filterSearch}
        />
      </div>

      <h2>Add A New</h2>

      <form>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>

        <div>
          number: <input 
            value={newNumber}
            onChange={handleNumChange}
          />
        </div>

        <div>
          <button type="submit" onClick={submitName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      <ul>
        {persons.map((person) => {
          return <li key={person.name}>{person.name} {person.number}</li>
        })}
      </ul>
      <div>
        </div>
    </div>
  )
}

export default App
