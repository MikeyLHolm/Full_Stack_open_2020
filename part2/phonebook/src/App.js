import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')

  const addPerson = (event) => {
  	event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      window.alert(newName + ' is already added to phonebook')
    } else {
      const personObject = { name: newName, id: newName}

      setPersons(persons.concat(personObject))
      setNewName('')
    }


  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      {/*<div>debug: {newName}</div>*/}
      <h2>Numbers</h2>
      {/*<div>*/}
      {/*  {persons.map(person => person.name)}*/}
      {/*</div>*/}
      <ul>
        {persons.map(person => (
          <li key={person.id}>{person.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App