import notificationReducer from '../reducers/notificationReducer'
import thunk from 'redux-thunk'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import errorReducer from '../reducers/errorReducer'
import blogReducer from '../reducers/blogReducer'

const reducer = combineReducers({
    notification: notificationReducer,
    error: errorReducer,
    blogs: blogReducer
})

export const store = createStore(
    reducer,
    applyMiddleware(thunk)
    )