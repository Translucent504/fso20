import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
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
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.voteAnecdote(id)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const initialAnecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: initialAnecdotes
    })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}



export default anecdoteReducer