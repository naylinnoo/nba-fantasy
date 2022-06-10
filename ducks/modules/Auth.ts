import { AnyAction, Dispatch } from "redux"

interface State {}

const initialState = {
    isLoggedIn: false,
    username: null,
}

export const ADD_POINTS = "add_points"

const AuthenticationReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case "UPDATE_LOGIN_STATUS":
            return {
                ...state,
                isLoggedIn: action.payload,
            }
        case "UPDATE_USERNAME_STATUS":
            return {
                ...state,
                username: action.payload,
            }
        default:
            return state
    }
}

export const login = (username: string, status: boolean) => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: "UPDATE_LOGIN_STATUS",
            payload: status,
        })

        dispatch({
            type: "UPDATE_USERNAME_STATUS",
            payload: username,
        })
    }
}

export const logout = () => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: "UPDATE_LOGIN_STATUS",
            payload: false,
        })

        dispatch({
            type: "UPDATE_USERNAME_STATUS",
            payload: null,
        })
    }
}

export default AuthenticationReducer
