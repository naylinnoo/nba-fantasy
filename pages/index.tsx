import Navbar from "components/nav"
import { RootState } from "ducks/Store"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"
const Home: NextPage = () => {
    const router = useRouter()
    const isLoggedin = useSelector((state: RootState) => state.auth.isLoggedIn)

    useEffect(() => {
        if (!isLoggedin) router.push("/login")
    }, [isLoggedin])

    return !isLoggedin ? <p>Redirecting...</p> : <>asdf</>
}

export default Home
