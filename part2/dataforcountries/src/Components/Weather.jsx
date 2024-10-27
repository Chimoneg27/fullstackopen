const Weather = ({ obj }) => {
    return (
      <div>
        <h2>Weather in {obj.name}</h2>

        <p>temperature {obj.main.temp}</p>
      </div>
    )
}

export default Weather