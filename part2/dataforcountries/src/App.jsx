import { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import Countries from './Components/Countries'
import axios from 'axios'
import './styles/app.css'

function App() {
  const [country, setCountry] = useState([])
  const [filterCountry, setFilterCountry] = useState([])
  const [countryName, setCountryName] = useState("")
  const [hidden, setHidden] = useState(null)
  // const [capital, setCapital] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountry(response.data)
      });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get()
  // })

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

const toggleShow = (code) => {
  // here the prevCode is tested against the code argument to see whether it matches or not, if does it stays null if not it turns to code
  setHidden(prevCode => (prevCode === code ? null : code))
}

  const conditions = (arr) => {
    if(countryName === "") {
      return <p>Enter a country</p>
    } else if(arr.length > 10) {
      return <p>Too many cases, specify further</p>
    } else if(arr.length <= 10 && arr.length > 1) {
      // then here we conditionally render the individual contry's data depending on the code mtches if it does it 
      // renders if it doesn't it will not render or open the one it matches
      return arr.map(nation => 
        <div key={nation.name.official}>
          {nation.name.official} <button onClick={() => toggleShow(nation.ccn3)}>show</button>
          {hidden === nation.ccn3 && 
            (<Countries countryArr={[nation]} objFunc={objToArr}/>)
          }
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
