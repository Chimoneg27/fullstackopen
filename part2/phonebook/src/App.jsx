import { useState } from 'react'
import Form from './components/Form'
import Filter from './components/Filter'
import Persons from './components/Persons'

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
  const [filterPersons, setFilterPersons] = useState(persons)

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

    setFilterPersons(persons.concat({
      name: newName,
      number: newNumber
    }))
    // both the filtered and original state should be updated at the same time

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
    const searchTerm = e.target.value // we target the input for the search field
    setSearchResult(searchTerm) // this sets the search result/keeps track of it

    const filtered = persons.filter((person) => {
      //here we filter out the letters in the input field from the filtered input
      return person.name.toLowerCase().includes(searchTerm.toLowerCase())
    })

    setFilterPersons(filtered)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter 
        value={searchResult}
        onChange={filterSearch}
      />

      <h2>Add A New</h2>

      <Form 
        name={newName}
        number={newNumber}
        onChangeName={handleNameChange}
        onChangeNumber={handleNumChange}
        onClick={submitName}
      />

      <h2>Numbers</h2>

      <Persons 
        personsArray={filterPersons}
      />
    </div>
  )
}

export default App
