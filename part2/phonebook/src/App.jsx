import { useState, useEffect } from "react"
import Form from "./components/Form"
import Filter from "./components/Filter"
import Persons from "./components/Persons"
import personService from "./services/persons"
import Notification from "./components/Notification"
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchResult, setSearchResult] = useState("")
  const [filterPersons, setFilterPersons] = useState(persons)
  const [addedMsg, setAddedMsg] = useState('')

  const submitName = (e) => {
    e.preventDefault()

    const newObj = {
      name: newName,
      number: newNumber
    }

    const nameInPhonebook = persons.map(person => person.name)
  
    if (nameInPhonebook.includes(newName)) {
      const msg = `${newName} is already in the phonebook. Do you want to update the number?`
      const confirm = window.confirm(msg)
      if(confirm) {
        updateName(newObj)
        setAddedMsg(
          `Updated ${newObj.name}'s number`
        )
        setTimeout(() => {
          setAddedMsg(null)
        }, 5000)
      }
    } else {
      personService.create(newObj).then((response) => {
        setPersons(persons.concat(response))
        setFilterPersons(persons.concat(response))
        setAddedMsg(
          `Added ${response.name}`
        )
        setTimeout(() => {
          setAddedMsg(null)
        }, 5000)
      })
    }

    setNewName("")
    setNewNumber("")
  }

  const updateName = (nameObj) => {
    const nameToUpdate = persons.find(p => p.name === nameObj.name)
    const nameId = nameToUpdate.id

    personService
    .update(nameId, nameObj)
    .then((returnedPerson) => 
      {
        //the returned persons is the response from the server
        //in the setpersons function we check if the ids match, if they don't we update the person, if they do we keep the person the same
        setPersons(persons.map(person => person.id !== nameId ? person : returnedPerson))
        setFilterPersons(persons.map(person => person.id !== nameId ? person : returnedPerson))
      }
    )
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumChange = (e) => {
    setNewNumber(e.target.value)
  }

  const filterSearch = (e) => {
    const searchTerm = e.target.value
    setSearchResult(searchTerm)

    const filtered = persons.filter((person) => {
      return person.name.toLowerCase().includes(searchTerm.toLowerCase())
    })

    setFilterPersons(filtered)
  }

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
      setFilterPersons(initialPersons)
    })
  }, [])

  const deletePerson = (e) => {
    const id = e.target.id
    const name = e.target.getAttribute("data")

    if (window.confirm(`Delete ${name} ?`)) {
      personService.remove(id).then(() => {
        setPersons((prevPersons) => prevPersons.filter((p) => p.id !== id))
        setFilterPersons((prevFilterPersons) => prevFilterPersons.filter((p) => p.id !== id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addedMsg}/>

      <Filter value={searchResult} onChange={filterSearch} />

      <h2>Add A New</h2>

      <Form
        name={newName}
        number={newNumber}
        onChangeName={handleNameChange}
        onChangeNumber={handleNumChange}
        onClick={submitName}
      />

      <h2>Numbers</h2>

      <Persons personsArray={filterPersons} removePerson={deletePerson} />
    </div>
  )
}

export default App
