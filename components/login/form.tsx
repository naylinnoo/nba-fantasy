import { login } from "ducks/modules/Auth"
import { ErrorMessage, Formik, FormikErrors } from "formik"
import { Button, Container, Form } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { AnyAction } from "redux"
import * as Yup from "yup"

const LoginForm = () => {
    const dispatch = useDispatch()
    type FormDefaultValues = {
        username: string
        password: string
    }

    const LoginSchema = Yup.object().shape({
        username: Yup.string()
            .matches(
                /^[a-zA-Z0-9]+$/,
                "Username must not contain whitespace or special characters"
            )
            .required("Required"),
        password: Yup.string().required("Required"),
    })

    const submit = () => {}

    return (
        <Container className="mt-5">
            <h3 className="text-center">Login Form</h3>
            <br />
            <Container className="d-flex justify-content-center">
                <Formik
                    initialValues={{ username: "", password: "" }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2))
                            dispatch(login(values.username, true))
                            setSubmitting(false)
                        }, 400)
                    }}
                    validationSchema={LoginSchema}
                >
                    {({ values, isSubmitting, handleSubmit, handleChange }) => (
                        <Form onSubmit={handleSubmit} className="w-50">
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                            >
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter username"
                                    value={values.username}
                                    name="username"
                                    onChange={handleChange}
                                />
                                <ErrorMessage
                                    name="username"
                                    className="text-danger pt-3"
                                    component="div"
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="formBasicPassword"
                            >
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={values.password}
                                    name="password"
                                    onChange={handleChange}
                                />
                                <ErrorMessage
                                    name="password"
                                    className="text-danger pt-3"
                                    component="div"
                                />
                            </Form.Group>

                            <Button
                                variant="primary"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Submit
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Container>
        </Container>
    )
}

export default LoginForm
