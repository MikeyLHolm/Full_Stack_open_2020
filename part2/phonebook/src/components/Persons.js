import React from 'react'

const Persons = ({ filter, persons, del }) =>  {
  return (
    <div>
      {persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())).map(dude =>
        <span key={dude.id}>
          {dude.name} {dude.number}
          <button onClick={del}>Del</button>
          <br/>
        </span>
      )}
    </div>
  )
}

export default Persons