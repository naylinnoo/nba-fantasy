import axios from "axios"
import fetcher from "fetcher"
import { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import useSWR from "swr"
import TeamForm from "./form"
const TeamCreate = () => {
    const [modalShow, setModalShow] = useState(false)

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
