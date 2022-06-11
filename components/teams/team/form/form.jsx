import { ErrorMessage, Formik, FormikErrors } from "formik"
import { Button, Container, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import PlayerSelect from "./PlayerSelect"

import * as Yup from "yup"
import { addTeam, updateTeam } from "ducks/modules/Teams"

const TeamForm = ({ setModalShow, edit = false, data = [] }) => {
    const dispatch = useDispatch()

    const teams = useSelector((state) => state.teams.teams)

    Yup.addMethod(Yup.string, "nameUnique", function (errorMessage) {
        return this.test(`test-name-unique`, errorMessage, function (value) {
            const { path, createError } = this

            return !edit
                ? !teams.find((data) => data.name === value)
                : teams.find((data) => data.name === value) ||
                      createError({ path, message: errorMessage })
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
            <h3 className="text-center">{edit ? "Edit" : "Create"} Team</h3>
            <br />
            <Container className="d-flex justify-content-center">
                <Formik
                    initialValues={{
                        name: edit ? data.name : "",
                        region: edit ? data.region : "",
                        country: edit ? data.country : "",
                        players: edit ? data.players : [],
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        if (edit) {
                            dispatch(updateTeam(values))
                        } else {
                            dispatch(addTeam(values))
                        }
                        alert(
                            `Team ${edit ? `edited` : `created`} successfully`
                        )
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
                                    disabled={edit}
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
                                {`${edit ? `Edit` : `Create`} Team`}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Container>
        </Container>
    )
}

export default TeamForm
