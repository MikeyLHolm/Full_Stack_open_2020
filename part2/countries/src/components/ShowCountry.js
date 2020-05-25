import React from 'react'

const ShowCountry = ({ country, show }) => {
  return (
    <span>
      {country.name}
      <button type='button' value={country.name} onClick={show}>show</button>
    </span>
    )
}

export default ShowCountry