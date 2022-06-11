import axios from "axios"

const loadOptions = async (search, page) => {
    const { data } = await axios.get(
        "https://www.balldontlie.io/api/v1/players",
        { params: { page: page, page_size: 10, search: search } }
    )
    const options = []

    console.log(data.meta)

    data?.data.map((value) => {
        options.push({
            value: value.id,
            label: `${value.first_name} ${value.last_name}`,
        })
    })
    const hasMore = data.meta.total_pages > page

    const slicedOptions = options
    return {
        options: slicedOptions,
        hasMore,
    }
}

export default loadOptions
