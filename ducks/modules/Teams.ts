import { AnyAction, Dispatch } from "redux"

const initialState = {
    teams: [],
}

export const ADD_POINTS = "add_points"

const TeamsReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case "UPDATE TEAMS":
            return {
                ...state,
                teams: action.payload,
            }
        default:
            return state
    }
}

export const addTeam = (player: any) => {
    //check if the player is free to be added to the team and proceed
}

export default TeamsReducer
