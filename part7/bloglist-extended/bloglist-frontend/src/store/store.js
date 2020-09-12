import notificationReducer from '../reducers/notificationReducer'
import thunk from 'redux-thunk'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import errorReducer from '../reducers/errorReducer'

const reducer = combineReducers({
    notification: notificationReducer,
    error: errorReducer
})

export const store = createStore(
    reducer,
    applyMiddleware(thunk)
    )