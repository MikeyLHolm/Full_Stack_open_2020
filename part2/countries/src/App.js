import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from "./components/Search";
import Country from "./components/Country";

const App = () => {
  const [ newSearch, setNewSearch ] = useState('')
  const [ countries, setCountry] = useState([])

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountry(response.data)
      })
  }

  useEffect(hook, [])

  const handleSearchChange = (event) => setNewSearch(event.target.value)

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
        search={newSearch}
        show={showCountry}
      />
    </div>
  )
}

export default App;
