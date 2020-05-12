import React, { useState } from 'react'

const App = () => {
  // const [ persons, setPersons ] = useState([])
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const addPerson = (event) => {
  	event.preventDefault()

    if (persons.map(person => person.name).includes(newName)) {
      window.alert(newName + ' is already added to phonebook')

    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        filter shown with
        <input
          value={newFilter}
          onChange={handleFilterChange}
        />
      </div>

      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={handleNumberChange}
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
      <div>
        {persons.filter(person =>
          person.name.toLowerCase().includes(newFilter.toLowerCase())).map(dude =>
          <span key={dude.name}>{dude.name} {dude.number}<br/></span>

        )}
        {/*{persons.map(person => (*/}
        {/*  <span key={person.name}>{person.name} {person.number}</span>*/}
        {/*))}*/}
      </div>
    </div>
  )
}

export default App