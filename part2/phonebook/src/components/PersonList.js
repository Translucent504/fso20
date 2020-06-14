import React from 'react'
import Persons from './Persons'

const PersonList = ({personFilter}) => {
    return (
        <div>
            <ul>
                {personFilter.map((p)=>(
                    <Persons key={p.name} person={p}/>
                ))}
            </ul>
        </div>
    )
}

export default PersonList
