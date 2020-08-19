
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}


const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {

    case 'VOTE': {
      const id = action.data.id
      const anecdoteToUpdate = state.find(a => a.id === id)
      const updatedAnecdote = {
        ...anecdoteToUpdate,
        votes: anecdoteToUpdate.votes + 1
      }
      return state.map(
        anecdote => anecdote.id === id
          ? updatedAnecdote
          : anecdote).sort((a, b) => b.votes - a.votes)
    }

    case 'NEW_ANECDOTE': {
      return [
        ...state,
        action.data
      ]
    }

    case 'INIT_ANECDOTES': {
      return action.data
    }
    default:
      return state
  }
}

export const voteForId = (id) => {
  return {
    type: 'VOTE',
    data: { id: id }
  }
}

export const initializeAnecdotes = (data) => {
  return {
    type: 'INIT_ANECDOTES',
    data
  }
}


export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}



export default anecdoteReducer