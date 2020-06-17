import React, { useState } from 'react'
import pp from '../services/person'

const AddPerson = ({ persons, setPersons, setPersonFilter }) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const addName = (event) => {
        event.preventDefault();
        let personExists = false;
        persons.forEach((person) => {
            if (person.name === newName) {
                if(window.confirm(`Replace ${person.name}'s phone number? `)){
                    pp.update(person.id, {name:newName, number:newNumber})
                    .then(returnedPerson=>{
                        setPersonFilter(persons.map(p=>p.name===newName? returnedPerson: p))
                        setPersons(persons.map(p=>p.name===newName? returnedPerson: p))
                        setNewName('')
                        setNewNumber('')
                    })
                }
                personExists = !personExists
                
            }
        })
        if (!personExists) {
            pp.create({ name: newName, number: newNumber })
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
