const initialState = {
    message: '',
    timeoutID: null
}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'SHOW_NOTIFICATION': {
            clearTimeout(state.timeoutID)
            return action.data
        }
        case 'REMOVE_NOTIFICATION': {
            return {
                message: '',
                timeoutID: null
            }
        }
        default:
            return state
    }
}

export const notify = (message, duration) => {
    return async (dispatch) => {
        const timeoutID = setTimeout(() => {
            dispatch(removeNotification())
        }, 1000 * duration);

        dispatch({
            type: 'SHOW_NOTIFICATION',
            data: {
                message,
                timeoutID
            }
        })
    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION',
    }
}



export default notificationReducer