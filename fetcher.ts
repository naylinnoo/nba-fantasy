import axios from "axios"

const fetcher = async (url: string, params: JSON) => {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL
    axios.defaults.headers.post["Content-Type"] = "application/json"

    try {
        const response = await axios.get(url, { params: params })
        return await response.data
    } catch (error) {
        return error
    }
}

export default fetcher
