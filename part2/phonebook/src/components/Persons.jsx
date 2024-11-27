const Persons = ({ personsArray = [], removePerson }) => {
  return (
    <ul>
      {personsArray.map((person) => {
        return (
          <li key={person.name}>
            {person.name} {person.number}
            <button id={person.id} data={person.name} onClick={removePerson}>delete</button>
          </li>
        )
      })}
    </ul>
  )
}

export default Persons
