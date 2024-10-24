const Country = ({ countryArr, objFunc }) => {
  return (
    <div>
    {countryArr.map((nation) => {
        return (
          <div key={nation.name.official}>
            <h2 key={nation.name.official}>{nation.name.official}</h2>

            <p>capital {nation.capital}</p>
            <p>area {nation.area}</p>
      
            <h3>Languages</h3>
            <ul>
              {objFunc(nation.languages)}
            </ul>

            <h3>Flag</h3>

            <img src={nation.flags.png} alt={nation.flags.alt} />
          </div>
        )
      })}
    </div>
  )
}

export default Country