import { login } from "ducks/modules/Auth"
import { ErrorMessage, Formik, FormikErrors } from "formik"
import { Button, Container, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import PlayerSelect from "./PlayerSelect"

import * as Yup from "yup"
import { useEffect, useState } from "react"
import { addTeam, updatePlayerInTeams } from "ducks/modules/Teams"
import { RootState } from "ducks/Store"

const TeamForm = ({ setModalShow }) => {
    const dispatch = useDispatch()

    const addPlayerToTeams = (players) => {
        var playersIds = []
        players.map((value) => {
            playersIds.push(value.value)
        })
        dispatch(updatePlayerInTeams(playersIds))
    }

    const teams = useSelector((state) => state.teams.teams)

    Yup.addMethod(Yup.string, "nameUnique", function (errorMessage) {
        return this.test(`test-name-unique`, errorMessage, function (value) {
            const { path, createError } = this

            return (
                !teams.find((data) => data.name === value) ||
                createError({ path, message: errorMessage })
            )
        })
    })

    const LoginSchema = Yup.object().shape({
        name: Yup.string()
            .matches(
                /^[a-zA-Z0-9z\s]+$/,
                "Name must not contain whitespace or special characters"
            )
            .nameUnique("Name must be unique")
            .required("Required"),
        region: Yup.string()
            .required("Required")
            .matches(
                /^[a-zA-Z0-9\s]+$/,
                "Username must not contain whitespace or special characters"
            ),
        country: Yup.string()
            .required("Required")
            .matches(
                /^[a-zA-Z0-9()\s]+$/,
                "Username must not contain whitespace or special characters"
            ),
        players: Yup.array()
            .required("Required")
            .min(5, "There must be at least five players on the team")
            .max(
                15,
                "A basketball team can only be the size of 15 according to the NBA"
            ),
    })

    const submit = () => {}

    return (
        <Container fluid className=" mb-5">
            <h3 className="text-center">Create Team</h3>
            <br />
            <Container className="d-flex justify-content-center">
                <Formik
                    initialValues={{
                        name: "",
                        region: "",
                        country: "",
                        players: [],
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        dispatch(addTeam(values))
                        addPlayerToTeams(values.players)
                        alert("Team created successfully")
                        setSubmitting(false)
                        setModalShow(false)
                    }}
                    validationSchema={LoginSchema}
                >
                    {({
                        values,
                        isSubmitting,
                        handleSubmit,
                        handleChange,
                        setFieldValue,
                    }) => (
                        <Form onSubmit={handleSubmit} className="w-50">
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicName"
                            >
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Name"
                                    value={values.name}
                                    name="name"
                                    onChange={handleChange}
                                />
                                <ErrorMessage
                                    name="name"
                                    className="text-danger pt-3"
                                    component="div"
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicRegion"
                            >
                                <Form.Label>Region</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Region"
                                    value={values.region}
                                    name="region"
                                    onChange={handleChange}
                                />
                                <ErrorMessage
                                    name="region"
                                    className="text-danger pt-3"
                                    component="div"
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicCountry"
                            >
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Country"
                                    value={values.country}
                                    name="country"
                                    onChange={handleChange}
                                />
                                <ErrorMessage
                                    name="country"
                                    className="text-danger pt-3"
                                    component="div"
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="formBasicPlayers"
                            >
                                <Form.Label>
                                    Players(Total - {values.players.length})
                                </Form.Label>
                                <h6></h6>
                                <PlayerSelect
                                    value={values.players}
                                    setValue={setFieldValue}
                                />
                                <ErrorMessage
                                    name="players"
                                    className="text-danger pt-3"
                                    component="div"
                                />
                            </Form.Group>

                            <Button
                                variant="primary"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Create Team
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Container>
        </Container>
    )
}

export default TeamForm
