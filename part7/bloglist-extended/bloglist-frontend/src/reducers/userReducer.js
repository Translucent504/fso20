import blogService from '../services/blogs'
import loginService from '../services/login'
import { showError } from './errorReducer';
import { notify } from './notificationReducer';

// Initial State
const initialState = null;

// Action Types
const SET_USER = 'SET_USER'
const LOGOUT = 'LOGOUT'

// User Slice Reducer
export default (state = initialState, { type, payload }) => {
    switch (type) {

        case SET_USER:
            return payload

        case LOGOUT:
            return null

        default:
            return state
    }
}

// Action Creators
export const initializeUser = () => {
    const storedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (storedUserJSON) {
        var user = JSON.parse(storedUserJSON)
        blogService.setToken(user.token)
    }
    return (dispatch) => {
        dispatch({
            type: SET_USER,
            payload: typeof (user) === 'undefined' ? null : user
        })
    }
}

export const logoutUser = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    return (dispatch) => {
        dispatch({
            type: LOGOUT
        })
    }
}

export const loginUser = (username, password) => {
    return async (dispatch) => {
        try {
            const loggedUser = await loginService.login({
                username,
                password
            })
            if (loggedUser) {
                window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(loggedUser))
                blogService.setToken(loggedUser.token)
            }
            dispatch({
                type: SET_USER,
                payload: loggedUser
            })
            dispatch(notify('Successfully logged in'))
        } catch (error) {
            dispatch(showError('Invalid username or password'))
        }
    }
}


