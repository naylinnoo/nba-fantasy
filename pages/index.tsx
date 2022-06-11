import Navbar from "components/nav"
import Teams from "components/teams"
import { RootState } from "ducks/Store"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"
const Home: NextPage = () => {
    const router = useRouter()
    const username = useSelector((state: RootState) => state.auth.username)

    useEffect(() => {
        if (!username) router.push("/login")
    }, [username])

    return !username ? (
        <p>Redirecting...</p>
    ) : (
        <>
            <Teams />
        </>
    )
}

export default Home
