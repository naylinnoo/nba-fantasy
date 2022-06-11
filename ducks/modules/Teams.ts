import { Dispatch } from "redux"

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
    playersInTeams: number[]
}

const initialState: TeamState = {
    teams: [],
    playersInTeams: [],
}

export const ADD_TEAM = "add_team"
export const UPDATE_PLAYER_IN_TEAMS = "update_player_in_teams"

const TeamsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "ADD_TEAM":
            return {
                ...state,
                teams: [...state.teams, action.payload],
            }
        case "UPDATE_PLAYER_IN_TEAMS":
            console.log(action.payload)
            return {
                ...state,
                playersInTeams: [...state.playersInTeams, ...action.payload],
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

export const updatePlayerInTeams = (players: number[]) => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: "UPDATE_PLAYER_IN_TEAMS",
            payload: players,
        })
    }
}

export default TeamsReducer
