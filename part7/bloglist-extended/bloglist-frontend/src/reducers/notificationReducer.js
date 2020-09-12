const initialState = {
    message: null
}

const notificationReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case 'REMOVE_NOTIFICATION':
            return { message: null }

        case 'SHOW_NOTIFICATION':
            return { message: payload }
        default:
            return state
    }
}


export const clearNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION'
    }
}

export const notify = (message) => {
    return (dispatch) => {
        dispatch({
            type: 'SHOW_NOTIFICATION',
            payload: message
        })
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }
}


export default notificationReducer