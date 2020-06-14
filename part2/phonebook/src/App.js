import React, { useState } from 'react'


const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
      ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [personFilter, setPersonFilter] = useState(persons)
    const addName = (event) => {
        event.preventDefault();
        let personExists = false;
        persons.forEach((person) =>{
            if(person.name === newName){
                alert(`${person.name} already Exists`)
                personExists = !personExists
                setNewName('')
            }
        })
        if(!personExists){
            setPersons(persons.concat({name:newName, number:newNumber}))
            setNewName('')
            setNewNumber('')
        }
        
    }   
    const filterNames = (event) => {
        if(event.target.value){
            setPersonFilter(persons.filter((person) => {
                return person.name.toLowerCase().includes(event.target.value.toLowerCase())
            }))
        } else{
        setPersonFilter(persons)
        }
    }
    

    return (
        <div>
            <h2>Phonebook</h2>
            <input onChange={filterNames} placeholder="Search"></input>
            <h2>Add New</h2>
            <form onSubmit={addName}>
                <div>
                    name: <input onChange={(event) => 
                        setNewName(event.target.value)} 
                        value={newName}/>
                </div>
                <div>
                    number: <input onChange={(event) => 
                        setNewNumber(event.target.value)} 
                        value={newNumber}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {personFilter.map((person)=>(
                    <li key={person.name}>
                        {person.name} {person.number}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default App