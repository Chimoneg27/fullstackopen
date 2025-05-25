import { gql, useQuery } from '@apollo/client'
import './App.css'

const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`

const Persons = ({ persons }) => {
  return (
    <div>
      <h2>Persons</h2>
      {persons.map(p =>
        <div key={p.name}>
          {p.name} {p.phone}
        </div>  
      )}
    </div>
  )
}

function App() {
  const result = useQuery(ALL_PERSONS) // returns an object with many fields

  if(result.loading) {
    return <div>loading...</div> // waiting for the response from the useQuery(ALL_Persons) line 15
  }

  return (
    <>
    <h1>Apollo Client Practice</h1>

    <div>
      <Persons persons={result.data.allPersons}/>
    </div>
    </>
  )
}

export default App
