const initialState = {
    username: '',
    profile_pic: ''
}

const UPDATE_USER = 'UPDATE_USER'
const LOGOUT = 'LOGOUT'


export function updateUser(user) {
    
    return {
        type: UPDATE_USER,
        payload: user
    }
}


export function logout(){
    return{
        type: LOGOUT
    }
}

export default function reducer(state = initialState, action) {
        
    switch(action.type) {
        default:
            return state
        case UPDATE_USER:
            return {...state, ...action.payload }
        case LOGOUT:
            return state
    }
}