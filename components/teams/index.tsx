import { removeTeam } from "ducks/modules/Teams"
import { RootState } from "ducks/Store"
import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import TeamCreate from "./team/create"
import TeamEdit from "./team/edit"

const Teams = () => {
    const dispatch = useDispatch()
    const { teams } = useSelector((state: any) => state.teams)
    const [modalShow, setModalShow] = useState(false)
    const [currentTeam, setCurrentTeam] = useState(
        teams.length > 0 ? teams[0] : null
    )

    useEffect(() => {
        setCurrentTeam(teams[0])
    }, [teams])

    return (
        <>
            <TeamCreate />
            {teams.length > 0 ? (
                <Container>
                    <h2>YOUR TEAMS</h2>
                    <TeamEdit
                        name={currentTeam?.name}
                        modalShow={modalShow}
                        setModalShow={setModalShow}
                    />
                    <Row gap={3}>
                        {teams.map((value: any, index: number) => {
                            return (
                                <Col xs lg="3" className="p-3" key={index}>
                                    <Card style={{ width: "18rem" }}>
                                        <Card.Body>
                                            <Card.Title className="pb-3">
                                                {value.name}
                                            </Card.Title>
                                            <Card.Text>
                                                Region: {value.region}
                                            </Card.Text>
                                            <Card.Text>
                                                Country: {value.country}
                                            </Card.Text>
                                            <Card.Text>
                                                Team size: {value.player_count}
                                            </Card.Text>
                                            <div>
                                                <p>Members</p>
                                                {value.players.map(
                                                    (
                                                        player: any,
                                                        index: number
                                                    ) => {
                                                        return (
                                                            <span
                                                                className="badge bg-secondary"
                                                                key={index}
                                                            >
                                                                {player.label}
                                                            </span>
                                                        )
                                                    }
                                                )}
                                            </div>

                                            <br />
                                            <Button
                                                variant="primary"
                                                onClick={() => {
                                                    setCurrentTeam(value)
                                                    setModalShow(true)
                                                }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={() => {
                                                    dispatch(removeTeam(value))
                                                    alert("deleted")
                                                }}
                                            >
                                                DELETE
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })}
                        <Col> </Col>
                    </Row>
                </Container>
            ) : (
                <h3>Please add some team</h3>
            )}
        </>
    )
}

export default Teams
