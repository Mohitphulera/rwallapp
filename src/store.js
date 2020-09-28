import { createStore } from 'redux'

const initialState = {
    user: null
}

const SET_USER = 'SET_USER'

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER: {
            console.log(action.payload ? 'logging in' : 'logging out')
            return {
                user: action.payload
            }
        }
        default: {
            return state
        }
    }
}


export function setUser(user = null) {
    return {
        type: SET_USER,
        payload: user
    }
}

export const store = createStore(reducer)