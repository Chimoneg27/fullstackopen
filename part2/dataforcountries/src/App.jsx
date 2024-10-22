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

  return (
    <div>
      <h1>Data for Countries</h1>

      <Filter />

      <div>
       Countries go here
      </div>
    </div>
  )
}

export default App
