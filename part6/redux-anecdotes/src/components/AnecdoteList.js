import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteForId } from '../reducers/anecdoteReducer'
import { notify, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({anecdotes, filter}) => anecdotes.filter(a => a.content.includes(filter)))
    const dispatch = useDispatch()
    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteForId(id))
        const message = anecdotes.find(a => a.id === id).content
        dispatch(notify(`You voted for '${message}'`))
        setTimeout(() => dispatch(removeNotification()),
            5000)
    }

    return (
        <div>
            {anecdotes
            .map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes} 
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList
