const Weather = ({ obj }) => {
    const iconUrl = " https://openweathermap.org/img/wn/"
    const image = obj.weather[0].icon +".png"
    const src = iconUrl + image
    return (
      <div className="weatherIcon">
        <h2>Weather in {obj.name}</h2>

        <img src={src} alt="weatherIcon" />

        <p>temperature {obj.main.temp} degrees</p>

        <p>wind {obj.wind.speed} m/s</p>
      </div>
    )
}

export default Weather