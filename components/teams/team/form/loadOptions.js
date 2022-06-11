import axios from "axios"
import { useSelector } from "react-redux"
import { store } from "ducks/Store"

const loadOptions = async (search, page) => {
    const { data } = await axios.get(
        "https://www.balldontlie.io/api/v1/players",
        { params: { page: page, per_page: 10, search: search } }
    )
    const options = []
    const { teams } = store.getState().teams

    const playersInTeams = []
    teams.map((team) => {
        team.players.map((player) => {
            playersInTeams.push(player.value)
        })
    })

    data?.data.map((value) => {
        if (!playersInTeams.includes(value.id)) {
            options.push({
                value: value.id,
                label: `${value.first_name} ${value.last_name}`,
            })
        }
    })
    const hasMore = data.meta.total_pages > page

    const slicedOptions = options
    return {
        options: slicedOptions,
        hasMore,
    }
}

export default loadOptions
