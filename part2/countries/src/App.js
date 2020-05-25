import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from "./components/Search";
import Country from "./components/Country";

const App = () => {
  const [ newSearch, setNewSearch ] = useState('')
  const [ countries, setCountry] = useState([])
  // const [ weather, setWeather] = useState([])

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountry(response.data)
      })
  }

  useEffect(hook, [])

  const handleSearchChange = (event) => setNewSearch(event.target.value)
  // const handleWeather = weather => setWeather(weather)
  const showCountry = (event) => {
    event.preventDefault()
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <Search
        text='find countries'
        search={newSearch}
        onChange={handleSearchChange}
      />
      <Country
        countries={countries}
        // handleWeather={handleWeather()}
        search={newSearch}
        show={showCountry}
        // weather={weather}
      />
    </div>
  )
}

export default App;
