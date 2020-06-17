import React, { useState } from 'react'
import person from '../services/person'

const AddPerson = ({ persons, setPersons, setPersonFilter }) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const addName = (event) => {
        event.preventDefault();
        let personExists = false;
        persons.forEach((person) => {
            if (person.name === newName) {
                alert(`${person.name} already Exists`)
                personExists = !personExists
                setNewName('')
                setNewNumber('')
            }
        })
        if (!personExists) {
            person.create({ name: newName, number: newNumber })
            .then(returnedPerson=>{
                setPersons(persons.concat(returnedPerson))
                setNewName('')
                setNewNumber('')
                setPersonFilter(persons.concat(returnedPerson))
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
