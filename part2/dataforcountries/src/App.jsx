import { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import Countries from './Components/Countries'
import Weather from './Components/Weather'
import axios from 'axios'
import './styles/app.css'

function App() {
  const [country, setCountry] = useState([])
  const [filterCountry, setFilterCountry] = useState([])
  const [countryName, setCountryName] = useState("")
  const [hidden, setHidden] = useState(null)
  const [capital, setCapital] = useState('London')
  const [weatherData, setWeatherData] = useState(null)
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountry(response.data)
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`)
      .then(response => setWeatherData(response.data))
  }, [capital, apiKey])

  const onSearchCountry = (e) => {
    const searchName = e.target.value
    setCountryName(searchName)

    const filtered = country.filter((nation) => {
      return nation.name.official.toLowerCase().includes(searchName.toLowerCase())
    })
    setFilterCountry(filtered)
    setCapital(filterCountry[0].capital[0])
    console.log(filterCountry)
    console.log(filterCountry[0].capital[0])
  }

const objToArr = (obj) => {
  if (!obj) return <li>No languages available</li>
  const objArr = Object.values(obj)
  const newArr = objArr.map((val) => (
    <li key={val}>{val}</li>
  ))

  return newArr
}

const toggleShow = (code) => {
  setHidden(prevCode => (prevCode === code ? null : code))
}

  const conditions = (arr) => {
    if(countryName === "") {
      return <p>Enter a country</p>
    } else if(arr.length > 10) {
      return <p>Too many cases, specify further</p>
    } else if(arr.length <= 10 && arr.length > 1) {
      return arr.map(nation => 
        <div key={nation.name.official}>
          {nation.name.official} <button onClick={() => toggleShow(nation.ccn3)}>show</button>
          {hidden === nation.ccn3 && 
            (<Countries countryArr={[nation]} objFunc={objToArr}/>)
          }
        </div>)
    } else {
      return (
        <div>
          <Countries countryArr={arr} objFunc={objToArr}/>

          <Weather obj={weatherData}/>
        </div>
      )
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
