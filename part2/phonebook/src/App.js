import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import AddPerson from './components/AddPerson'
import PersonList from './components/PersonList'
import person from './services/person'
const App = () => {
    const [persons, setPersons] = useState([])
    const [personFilter, setPersonFilter] = useState([...persons])
    
    useEffect(()=>{
        person
        .getAll()
        .then((allPersons)=>{
            setPersons(allPersons)
            setPersonFilter(allPersons)
        })
    }, [])

    const deletePerson = (id, name) => {
        if(window.confirm(`Delete ${name}?`)){
            person.remove(id)
            .then(()=>{
                console.log()
            setPersonFilter(personFilter.filter(p=>p.id !== id))
            setPersons(persons.filter(p=>p.id !== id))
        })
    }
}

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter persons={persons} setPersonFilter={setPersonFilter}/>
            <h2>Add New</h2>
            <AddPerson persons={persons} setPersons={setPersons} setPersonFilter={setPersonFilter}/>
            <h2>Numbers</h2>
            <PersonList personFilter={personFilter} deletePerson={deletePerson}/>
        </div>
    )
}

export default App