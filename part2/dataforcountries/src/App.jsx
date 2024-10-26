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
      });
  }, []);

  const onSearchCountry = (e) => {
    const searchName = e.target.value
    setCountryName(searchName)

    const filtered = country.filter((nation) => {
      return nation.name.official.toLowerCase().includes(searchName.toLowerCase())
    })
    setFilterCountry(filtered)
  }

const objToArr = (obj) => {
  if (!obj) return <li>No languages available</li>
  const objArr = Object.values(obj)
  const newArr = objArr.map((val) => (
    <li key={val}>{val}</li>
  ))

  return newArr
}

  const conditions = (arr) => {
    if(countryName === "") {
      return <p>Enter a country</p>
    } else if(arr.length > 10) {
      return <p>Too many cases, specify further</p>
    } else if(arr.length <= 10 && arr.length > 1) {
      return arr.map(nation => 
        <div key={nation.name.official}>
          {nation.name.official} <button>show</button>
        </div>)
    } else {
      return <Countries countryArr={arr} objFunc={objToArr}/>
    }
  }

  return (
    <div>
      <h1>Data for Countries</h1>

      <Filter value={countryName} onChange={onSearchCountry}/>

      <div>
        {conditions(filterCountry)}
      </div>
    </div>
  )
}

export default App
