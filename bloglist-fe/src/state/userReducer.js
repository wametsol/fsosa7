import userService from '../services/user'

const initialState = {
    user: null,
    userlist:[]
}

const userReducer = (state = initialState, action) => {
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

export const setUserList = () => {
    return async dispatch => {
        const users = await userService.getAll()
        dispatch({
            type: "SET_USER_LIST",
            payload: users
        })
     }
}

export default userReducer

