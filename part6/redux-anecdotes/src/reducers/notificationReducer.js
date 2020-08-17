

const notificationReducer = (state= 'default notification', action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION': {
            return action.data
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


export default notificationReducer