import React, {useEffect, useState} from 'react'
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY

const Weather = ( { capital } ) => {
  const [ weather, setWeather] = useState(null)

  const api = "http://api.openweathermap.org/data/2.5/weather?q=" + capital + "&units=metric&APPID=" + api_key
  console.log(api)

  useEffect(() => {
      axios
        .get(api)
        .then(response => {
          setWeather(response.data)
          console.log(response.data)
        })
    },[api])

  if (weather) {

    return (
      <div>
        temperature: {Math.round(weather.main.temp)} Celsius
        <br/>
        <img alt="Weather icon" src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} />
        <br/>
        wind: {weather.wind.speed} mph direction {weather.wind.deg}
      </div>
    )
  } else {
    return <div>Weather data not available</div>
  }
}

export default Weather