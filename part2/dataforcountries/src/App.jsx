import { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import axios from 'axios'

function App() {
  const [country, setCountry] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response =>
        setCountry(response.data)
      ), []
  })

  // const onSearchCountry = (e) => {
  //   e.preventD
  // }



  return (
    <div>
      <h1>Data for Countries</h1>

      <Filter />

      <div>
        {country.map((nation) => {
          return (
            <div key={nation.name.official}>
              <h2 key={nation.name.official}>{nation.name.official}</h2>

              <p>capital {nation.capital}</p>
              <p>area {nation.area}</p>
        
              <h2>Languages</h2>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
