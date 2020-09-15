import notificationReducer from '../reducers/notificationReducer'
import thunk from 'redux-thunk'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import errorReducer from '../reducers/errorReducer'
import blogReducer from '../reducers/blogReducer'
import userReducer from '../reducers/userReducer'
import allUsersReducer from '../reducers/allUsersReducer'

const reducer = combineReducers({
    notification: notificationReducer,
    error: errorReducer,
    blogs: blogReducer,
    user: userReducer,
    users: allUsersReducer
})

export const store = createStore(
    reducer,
    applyMiddleware(thunk)
    )