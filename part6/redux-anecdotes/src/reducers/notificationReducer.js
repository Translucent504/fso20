

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

export const notify = (message) => {
    return {
        type: 'SHOW_NOTIFICATION',
        data: message
    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION'
    }
}



export default notificationReducer