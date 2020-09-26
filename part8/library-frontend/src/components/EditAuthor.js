import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import Select from "react-select";
import { ALL_AUTHORS, ALL_BOOKS, EDIT_AUTHOR } from "../queries";

// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' },
// ];

const EditAuthor = ({ authors }) => {
    const options = authors?.map(a => ({ value: a.name, label: a.name }))
    const [selectedOption, setSelectedOption] = useState(null);
    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
        onError: (error) => console.log(error)
    })
    const [born, setBorn] = useState('')
    const handleEditAuthor = (event) => {
        event.preventDefault()
        editAuthor({
            variables: {
                name: selectedOption?.value,
                born: parseInt(born)
            }
        })
        setBorn('')
    }

    return (
        <div className="edit-author-form">
            <h1>Edit Author</h1>
            <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
            />
            <label htmlFor='born'>Born</label>
            <input onChange={({ target }) => setBorn(target.value)} value={born} type="text" id='born' />
            <button onClick={handleEditAuthor}>Update Author</button>
        </div>
    );
}

export default EditAuthor
