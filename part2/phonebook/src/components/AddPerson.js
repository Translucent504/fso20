import React, { useState } from 'react'
import pp from '../services/person'

const AddPerson = ({ persons, setPersons, setPersonFilter, setNotification, setErrorMessage }) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const addName = (event) => {
        event.preventDefault();
        let personExists = false;
        persons.forEach((person) => {
            if (person.name === newName) {
                // person exists
                if (window.confirm(`Replace ${person.name}'s phone number? `)) {
                    pp.update(person.id, { name: newName, number: newNumber })
                        .then(returnedPerson => {
                            console.log("This is supposed to be new:", returnedPerson)
                            setPersonFilter(persons.map(p => p.name === newName ? returnedPerson : p))
                            setPersons(persons.map(p => p.name === newName ? returnedPerson : p))
                            setNewName('')
                            setNewNumber('')
                            setNotification(`${returnedPerson.name} Updated`)
                        }).catch((error) => {
                            console.log(error.response.data.error)
                            // setPersonFilter(persons.filter(p => p.id !== person.id))
                            // setPersons(persons.filter(p => p.id !== person.id))
                            setNewName('')
                            setNewNumber('')
                            setErrorMessage(error.response.data.error)
                        })
                }
                personExists = !personExists
            }
        })
        if (!personExists) {
            pp.create({ name: newName, number: newNumber })
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                    setPersonFilter(persons.concat(returnedPerson))
                    setNotification(`${returnedPerson.name} Added`)
                })
                .catch(error => {
                    console.log(error.response.data)
                    setErrorMessage(error.response.data.error)
                })
        }

    }

    return (
        <form onSubmit={addName}>
            <div>
                name: <input onChange={(event) =>
                    setNewName(event.target.value)}
                    value={newName} />
            </div>
            <div>
                number: <input onChange={(event) =>
                    setNewNumber(event.target.value)}
                    value={newNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default AddPerson
