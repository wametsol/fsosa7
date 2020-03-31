const initialState = {
    success: null,
    error: null
}

export const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SUCCESS':
            state.success = action.payload
            return state
        case 'SET_ERROR':
            state.error = action.payload
            return state
        case 'CLEAR':
            state.success=null
            state.error=null
            return state
        default:
            return state
    }
}


export const setSuccess = (message) => {
    return {
        type: "SET_SUCCESS",
        payload: message
       }
}

export const setError = (message) => {
    return {
        type: "SET_ERROR",
        payload: message
       }
}

export const clearNotification = () => {
    return {
        type: "CLEAR"
    }
}