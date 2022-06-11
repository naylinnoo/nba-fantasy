import { logout } from "ducks/modules/Auth"
import { removeAllTeam } from "ducks/modules/Teams"
import { RootState } from "ducks/Store"
import { Nav } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"

const Navbar = () => {
    const dispatch = useDispatch()

    const username = useSelector((state: RootState) => state.auth.username)

    const handleLogout = () => {
        dispatch(logout())
        dispatch(removeAllTeam())
    }

    return (
        <Nav className="justify-content-end" activeKey="/">
            <Nav.Item>
                <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            {username ? (
                <>
                    <Nav.Item>
                        <Nav.Link eventKey="disabled" disabled>
                            {username}
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    </Nav.Item>
                </>
            ) : (
                <Nav.Item>
                    <Nav.Link href="/login">Login</Nav.Link>
                </Nav.Item>
            )}
        </Nav>
    )
}

export default Navbar
