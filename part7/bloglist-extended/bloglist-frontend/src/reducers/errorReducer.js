const initialState = {
    message: null
}

const errorReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case 'REMOVE_ERROR':
            return { message: null }

        case 'SHOW_ERROR':
            return { message: payload }
        default:
            return state
    }
}


export const clearError = () => {
    return {
        type: 'REMOVE_ERROR'
    }
}

export const showError = (message) => {
    return (dispatch) => {
        dispatch({
            type: 'SHOW_ERROR',
            payload: message
        })
        setTimeout(() => {
            dispatch(clearError())
        }, 5000)
    }
}


export default errorReducer