import React from 'react'
import Persons from './Persons'


const PersonList = ({personFilter, deletePerson}) => {
    return (
        <div>
            <ul>
                {personFilter.map((p)=>(
                    <Persons key={p.id} person={p} deletePerson={()=>deletePerson(p.id, p.name)}/>
                ))}
            </ul>
        </div>
    )
}

export default PersonList
