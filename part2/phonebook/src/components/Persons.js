import React from 'react'

const Persons = ({ filter, persons }) =>  {
  return (
    <div>
      {persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())).map(dude =>
        <span key={dude.id}>{dude.name} {dude.number}<br/></span>
      )}
    </div>
  )
}

export default Persons