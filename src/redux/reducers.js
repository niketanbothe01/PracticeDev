import { SET_USER_NAME, SET_USER_PASSWORD, GET_CITIES } from "./actions";

const initialState = {
    name : '',
    password: '',
    cities: [],
}

function userReducer(state = initialState, action){
    switch (action.type){
        case SET_USER_NAME:
            return{...state, name: action.payload};
        case SET_USER_PASSWORD:
            return{...state, password: action.payload};
        case GET_CITIES:
            return{...state, cities: action.payload};
        default:
            return state;

    }
}


export default userReducer;