

const initialState = {
    user: null,
    userlist:[]
}

export const userReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_USER':
            state.user = action.payload
            return state
        case 'LOGOUT':
            state.user = null
            return state
        case 'SET_USER_LIST':
            return {
                ...state,
                userlist: action.payload
              }
        default:
            return state
    }
}



export const setLoggedUser = (loggedUser) => {
    return {
        type: "SET_USER",
        payload: loggedUser
    }
}

export const userLogout = () => {
    return {
        type: "LOGOUT"
    }
}

export const setUserList = (users) => {
    return {
        type: "SET_USER_LIST",
        payload: users
    }
}