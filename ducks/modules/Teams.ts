import { PayloadAction } from "@reduxjs/toolkit"
import { AnyAction, Dispatch } from "redux"
import { string } from "yup"

type TeamModel = {
    name: string
    region: string
    country: string
    players: PlayerModel[]
}

type PlayerModel = {
    value: number
    label: string
}

type TeamState = {
    teams: TeamModel[]
}

const initialState: TeamState = {
    teams: [],
}

export const ADD_TEAM = "add_team"

const TeamsReducer = (
    state = initialState,
    action: PayloadAction<TeamModel>
) => {
    switch (action.type) {
        case "ADD_TEAM":
            const { name, region, country, players } = action.payload
            return {
                ...state,
                teams: [...state.teams, { name, region, country, players }],
            }
        default:
            return state
    }
}

export const addTeam = (team: TeamModel) => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: "ADD_TEAM",
            payload: team,
        })
    }
}

export default TeamsReducer
