import { Dispatch } from "redux"

type TeamModel = {
    name: string
    region: string
    country: string
    playerCount: number
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
export const UPDATE_TEAM = "update_team"
export const REMOVE_TEAM = "remove_team"
export const REMOVE_ALL = "remove_all"

const TeamsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "ADD_TEAM":
            var { name, country, region, players } = action.payload
            return {
                ...state,
                teams: [
                    ...state.teams,
                    {
                        name,
                        country,
                        region,
                        players,
                        player_count: players.length,
                    },
                ],
            }
        case "UPDATE_TEAM":
            var { name, country, region, players } = action.payload
            var teams = state.teams.filter((value: any) => value.name !== name)

            return {
                ...state,
                teams: [
                    {
                        name,
                        country,
                        region,
                        players,
                        player_count: players.length,
                    },
                    ...teams,
                ],
            }
        case "REMOVE_TEAM":
            var { name, country, region, players } = action.payload
            var teams = state.teams.filter((value: any) => value.name !== name)

            return {
                ...state,
                teams: [...teams],
            }
        case "REMOVE_ALL":
            return {
                ...state,
                teams: [],
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
export const updateTeam = (team: TeamModel) => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: "UPDATE_TEAM",
            payload: team,
        })
    }
}

export const removeTeam = (team: TeamModel) => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: "REMOVE_TEAM",
            payload: team,
        })
    }
}
export const removeAllTeam = () => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: "REMOVE_ALL",
        })
    }
}
export default TeamsReducer
