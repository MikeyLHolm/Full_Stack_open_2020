import React, { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.map(person => person.name).includes(newName)) {
      window.alert(newName + ' is already added to phonebook')

    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const delPerson = id => {

    // const person = persons.find(n => n.id === id).name

    personService
      .del(id)
      .then(() => {
        setPersons(persons.filter(n => n.id !== id))
      })
      // .catch(error => {
      //   alert(
      //     `the note '${persons.id}' was already deleted from server`
      //   )
      //   setPersons(persons.filter(n => n.id !== id))
      // })

  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter text='filter shown with' filter={newFilter} onChange={handleFilterChange}/>

      <h3>add a new</h3>

      <PersonForm
        addPerson={addPerson}
        name={newName}
        nameOnChange={handleNameChange}
        number={newNumber}
        numberOnChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons
        filter={newFilter}
        persons={persons}
        del={delPerson}
      />

    </div>
  )
}

export default App