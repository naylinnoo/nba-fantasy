import { AsyncPaginate } from "react-select-async-paginate"
import loadOptions from "./loadOptions"

const PlayerSelect = ({ value, setValue }) => {
    const handleChange = (value) => {
        setValue("players", value)
    }

    const defaultAdditional = {
        page: 1,
    }

    const loadPageOptions = async (q, prevOptions, { page }) => {
        const { options, hasMore } = await loadOptions(q, page)

        return {
            options,
            hasMore,

            additional: {
                page: page + 1,
            },
        }
    }

    return (
        <AsyncPaginate
            required
            additional={defaultAdditional}
            loadOptions={loadPageOptions}
            isMulti
            closeMenuOnSelect={false}
            onChange={handleChange}
            value={value}
        />
    )
}

export default PlayerSelect
