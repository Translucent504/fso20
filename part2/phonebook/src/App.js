import React, { useState } from 'react'
import Filter from './components/Filter'
import AddPerson from './components/AddPerson'
import PersonList from './components/PersonList'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
      ])
    const [personFilter, setPersonFilter] = useState([...persons])

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter persons={persons} setPersonFilter={setPersonFilter}/>
            <h2>Add New</h2>
            <AddPerson persons={persons} setPersons={setPersons} setPersonFilter={setPersonFilter}/>
            <h2>Numbers</h2>
            <PersonList personFilter={personFilter}/>
        </div>
    )
}

export default App