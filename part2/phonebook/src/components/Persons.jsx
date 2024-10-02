const Persons = ({ personsArray }) => {
  return (
    <ul>
      {personsArray.map((person) => {
        return (
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        )
      })}
    </ul>
  )
}

export default Persons
