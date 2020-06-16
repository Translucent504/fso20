import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import AddPerson from './components/AddPerson'
import PersonList from './components/PersonList'
import axios from 'axios'

const App = () => {
    const [persons, setPersons] = useState([])
    const [personFilter, setPersonFilter] = useState([...persons])
    
    useEffect(()=>{
        axios
        .get("http://localhost:3001/persons")
        .then((response)=>{
            setPersons(response.data)
            setPersonFilter(response.data)
        })
    }, [])

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