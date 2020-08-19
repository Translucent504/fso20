import axios from 'axios';

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createAnecdote = async (content) => {
    console.log(content)
    const anecdote = {
        content,
        id: (100000 * Math.random()).toFixed(0),
        votes: 0
    }
    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

export default {
    getAll,
    createAnecdote
}