import React from 'react'

const Persons = ({person}) => {
    return (
        <li>
            {person.name} {person.number}
        </li>
    )
}

export default Persons
