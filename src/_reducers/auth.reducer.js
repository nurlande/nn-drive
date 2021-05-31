import { userConstants } from "./../_constants"

//Initial state
const initialState = { }

export function AuthReducer (state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST :
            return {
                userAuthState : userConstants.LOGIN_REQUEST 
            }
        case userConstants.LOGIN_SUCCESS : 
            return {
                userAuthState : userConstants.LOGIN_SUCCESS,
                token : action.token
            }
        case userConstants.LOGIN_FAILURE : 
            return {
                userAuthState : userConstants.LOGIN_FAILURE,
                msg : action.msg
            }
        case userConstants.LOGOUT : 
            return {
                userAuthState : userConstants.LOGOUT,
                msg : action.msg
            }
        case userConstants.REGISTER : 
            return {
                userAuthState : userConstants.REGISTER,
                msg : action.msg
            }
        default: { 
            return state;
        }
    }
}