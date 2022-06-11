import axios from "axios"
import fetcher from "fetcher"
import { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import useSWR from "swr"
import TeamForm from "./form"
const TeamCreate = () => {
    const [modalShow, setModalShow] = useState(false)

    useEffect(() => {
        async function callapi() {
            const { data } = await axios.get(
                "https://www.balldontlie.io/api/v1/players"
            )
            const options: any = []

            console.log(data)

            data?.data.map((value: any) => {
                options.push({
                    value: value.id,
                    label: `${value.first_name} ${value.last_name}`,
                })
            })

            console.log(options)
        }

        callapi()
    }, [])

    return (
        <div className="d-flex justify-content-end">
            <Button className="m-3" onClick={() => setModalShow(true)}>
                Create Team
            </Button>
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <TeamForm />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default TeamCreate
