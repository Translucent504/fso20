const filterReducer = (state='', action) => {
    switch (action.type) {
        case 'SET_FILTER' : {
            return action.data
        }
        default:
            return ''
    }
}

export const setFilter = (filter_string) => {
    return {
        type: 'SET_FILTER',
        data: filter_string
    }
}


export default filterReducer
