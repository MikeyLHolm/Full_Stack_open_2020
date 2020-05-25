import React from 'react'
import FilteredCountry from "./FilteredCountry";
import ShowCountry from "./ShowCountry";

const Country = ({ countries, search, show }) => {

  const filterCountries = countries.filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase()))

  if (filterCountries.length === countries.length) {
    return (
      <div/>
    )
  } else if (filterCountries.length > 10) {
    return (
      'Too many matches, specify another filter'
    )
  } else if (filterCountries.length === 1) {
    return (
      <FilteredCountry country={filterCountries[0]} />
    )
  }

  return (
    filterCountries.map(country =>
      <div key={country.alpha2Code}>
        <span>
          <ShowCountry country={country} show={show}/>
          <br/>
        </span>
      </div>
    )
  )
}

export default Country