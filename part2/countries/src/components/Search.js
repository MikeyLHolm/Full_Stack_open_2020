import React from 'react'

const Search = ({ text, search, onChange }) => {
  return (
    <div>
      {text}
      <input
        value={search}
        onChange={onChange}
      />
    </div>
  )
}

export default Search