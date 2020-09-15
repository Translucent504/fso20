import userService from '../services/users'

const initialState = []

const SET_USERS = 'SET_USERS'
const allUsersReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case SET_USERS:
        return payload

    default:
        return state
    }
}

export const initializeUsers = () => {
    return async (dispatch) => {
        userService.getAll()
            .then(data => dispatch({
                type: SET_USERS,
                payload: data
            }))
    }
}

export default allUsersReducer