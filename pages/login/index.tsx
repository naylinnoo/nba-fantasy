import LoginForm from "components/login/form"
import { RootState } from "ducks/Store"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"

const Login = () => {
    const router = useRouter()
    const isLoggedin = useSelector((state: RootState) => state.auth.isLoggedIn)

    useEffect(() => {
        if (isLoggedin) router.push("/")
    }, [isLoggedin])

    return isLoggedin ? <p>Redirecting</p> : <LoginForm />
}

export default Login
