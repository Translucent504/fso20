import React from 'react'

const Filter = ({persons, setPersonFilter}) => {
    const filterNames = (event) => {
        if(event.target.value){
            setPersonFilter(persons.filter((person) => {
                return person.name.toLowerCase().includes(event.target.value.toLowerCase())
            }))
        } else{
        setPersonFilter([...persons])
        }
    }

    return (
        <div>
            <input onChange={filterNames} placeholder="Search"></input>
        </div>
    )
}

export default Filter
