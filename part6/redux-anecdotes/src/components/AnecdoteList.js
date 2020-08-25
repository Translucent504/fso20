import React from 'react'
import { useDispatch, connect } from 'react-redux'
import { voteForId } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const anecdotes = props.anecdotes
    const dispatch = useDispatch()
    const vote = (id, content) => {
        props.voteForId(id)
        dispatch(notify(`You voted for '${content}'`, 5))
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
                        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes.filter(a => a.content.includes(state.filter))
    }
}

const mapDispatchToProps = (dispatch) => (
    {
        voteForId: id => dispatch(voteForId(id))
    }
)


export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
