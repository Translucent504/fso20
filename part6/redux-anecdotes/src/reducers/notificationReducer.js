const notificationReducer = (state = '', action) => {
    switch (action.type) {

        case 'SHOW_NOTIFICATION': {
            return action.data
        }
        case 'REMOVE_NOTIFICATION': {
            return ''
        }
        default:
            return state
    }
}

export const notify = (message, duration) => {
    return async (dispatch) => {
        dispatch({
            type: 'SHOW_NOTIFICATION',
            data: message
        })
        setTimeout(() => {
            dispatch(removeNotification())
        }, 1000 * duration);
    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION'
    }
}



export default notificationReducer