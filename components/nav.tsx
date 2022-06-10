import { RootState } from "ducks/Store"
import { Nav } from "react-bootstrap"
import { useSelector } from "react-redux"

const Navbar = () => {
    const username = useSelector((state: RootState) => state.auth.username)

    return (
        <Nav className="justify-content-end" activeKey="/">
            <Nav.Item>
                <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>
                    {username ?? "california"}
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/login">Login</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}

export default Navbar
