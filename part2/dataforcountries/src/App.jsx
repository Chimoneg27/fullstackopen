import { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import Countries from './Components/Countries'
import axios from 'axios'
import './styles/app.css'

function App() {
  const [country, setCountry] = useState([])
  const [filterCountry, setFilterCountry] = useState([])
  const [countryName, setCountryName] = useState("")

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountry(response.data)
        console.log(response.data[0].languages)
      });
  }, []);

  const onSearchCountry = (e) => {
    const searchName = e.target.value
    setCountryName(searchName)

    const filtered = country.filter((nation) => {
      return nation.name.official.toLowerCase().includes(searchName.toLowerCase())
    })

    if(filtered.length <= 10) {
      setFilterCountry(filtered)
    } else {
      setFilterCountry([])
    }
  }

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

      <Filter value={countryName} onChange={onSearchCountry}/>
      
      {filterCountry.length === 0 || countryName === "" ? <p>Too many cases, specify further</p> : <Countries countryArr={filterCountry} objFunc={objToArr}/>}
    </div>
  )
}

export default App
