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

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.map(person => person.name).includes(newName)) {

      if (window.confirm(newName + ' is already added to phonebook, replace the old number with a new one?')) {
        const idd = persons.find(p => p.name === newName).id

        personService
          .update(idd, personObject)
          .then(updatedPerson => {
              setPersons(persons.map(p => p.id === idd ? updatedPerson : p))
            }
          )
      }

    } else {

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Do you want to delete ${name} from phonebook?`)) {
      personService
        .del(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
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
        filterName={newFilter}
        persons={persons}
        deletePerson={deletePerson}
      />

    </div>
  )
}

export default App