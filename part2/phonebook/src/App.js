import React, { useState } from 'react'


const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    const addName = (event) => {
        event.preventDefault();
        setPersons(persons.concat({name:newName}))
        setNewName('')
    }

    const changeNewName = (event) => {
        setNewName(event.target.value)
    }
    
    


    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addName}>
                <div>
                    name: <input onChange={changeNewName}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map((person)=>(
                    <li key={person.name}>
                        {person.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default App