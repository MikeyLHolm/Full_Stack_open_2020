import React from 'react'
import FilteredCountry from "./FilteredCountry";

const Country = ({ countries, search, show }) => {

  const filterCountries = countries.filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase()))

  if (filterCountries.length > 10) {
    return (
      'Too many matches, specify another filter'
    )
  }

  if (filterCountries.length === 1) {
    return (
      <FilteredCountry country={filterCountries[0]} />
    )
  }

  return (
    filterCountries.map(country =>
      <div key={country.alpha2Code}>
        <span>{country.name}<br/></span>
      </div>
    )
  )
}

export default Country