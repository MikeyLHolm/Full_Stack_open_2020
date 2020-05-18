import React from 'react'
import Weather from "./Weather";

const FilteredCountry = ({ country, weather, handle }) => {
  return (

    <div>
      <h2>{country.name}</h2>
      <div>
        <span>capital {country.capital} <br/></span>
        <span>population {country.population} <br/></span>
      </div>
      <h3>spoken languages</h3>
      <ul>
        {country.languages.map(lang =>
          <li key={lang.iso639_1}>{lang.name} </li>
        )}
      </ul>
      <img src={country.flag} width="10%" alt={`Flag of ${country.name}`} />
      <h3>Weather in {country.capital}</h3>
      <Weather capital={country.capital} weather={weather} handle={handle} />

    </div>
  )
}

export default FilteredCountry