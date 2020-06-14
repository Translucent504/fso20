import React, { useState } from 'react'

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
            setPersons(persons.concat({ name: newName, number: newNumber }))
            setNewName('')
            setNewNumber('')
            setPersonFilter(persons.concat({ name: newName, number: newNumber }))
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
