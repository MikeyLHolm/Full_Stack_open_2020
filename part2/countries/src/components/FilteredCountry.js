import React from 'react'

const FilteredCountry = ({ country, }) => {
  return (

    <div>
      <h2>{country.name}</h2>
      <div>
        <span>capital {country.capital} <br/></span>
        <span>population {country.population} <br/></span>

      </div>

      <h2>languages</h2>
      <ul>
        {country.languages.map(lang =>
          <li key={lang.iso639_1}>{lang.name} </li>
        )}
      </ul>
      <img src={country.flag} width="10%" alt="Flag of the country" />

    </div>
  )
}

export default FilteredCountry