const Persons = ({ personsArray, removePerson }) => {
  return (
    <ul>
      {personsArray.map((person) => {
        return (
          <li key={person.name}>
            {person.name} {person.number}
            <button onClick={removePerson}>delete</button>
          </li>
        )
      })}
    </ul>
  )
}

export default Persons
