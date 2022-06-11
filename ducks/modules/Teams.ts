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
    playersInTeams: number[]
}

const initialState: TeamState = {
    teams: [],
    playersInTeams: [],
}

export const ADD_TEAM = "add_team"
export const UPDATE_TEAM = "update_team"
export const UPDATE_PLAYER_IN_TEAMS = "update_player_in_teams"
export const ADD_PLAYER_IN_TEAMS = "add_player_in_teams"
export const REMOVE_PLAYER_IN_TEAMS = "remove_player_in_teams"

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
            const teams = state.teams.filter(
                (value: any) => value.name !== name
            )

            console.log("teams", teams, name)

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

export default TeamsReducer
