import LoginForm from "components/login/form"
import { RootState } from "ducks/Store"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"

const Login = () => {
    const router = useRouter()
    const username = useSelector((state: RootState) => state.auth.username)

    useEffect(() => {
        if (username) router.push("/")
    }, [username])

    return username ? <p>Redirecting</p> : <LoginForm />
}

export default Login
