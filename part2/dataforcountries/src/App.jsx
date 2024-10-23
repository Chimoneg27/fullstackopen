import { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import axios from 'axios'

function App() {
  const [country, setCountry] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountry(response.data)
        console.log(response.data[0].languages)
      });
  }, []);

  // const onSearchCountry = (e) => {
  //   e.preventD
  // }

const objToArr = (obj) => {
  if (!obj) return <li>No languages available</li>
  const objArr = Object.values(obj)
  const newArr = objArr.map((val) => (
    <li key={val}>{val}</li>
  ))

  return newArr
}


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
        
              <h3>Languages</h3>
              <ul>
                {objToArr(nation.languages)}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
