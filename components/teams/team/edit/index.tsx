import axios from "axios"
import fetcher from "fetcher"
import { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { useSelector } from "react-redux"
import useSWR from "swr"
import TeamForm from "../form/form"

const TeamEdit = ({ name, modalShow, setModalShow }: any) => {
    const { teams } = useSelector((state: any) => state.teams)

    const team = teams.filter((value: any) => value.name === name)
    console.log(team)

    return (
        <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <TeamForm data={team[0]} setModalShow={setModalShow} edit />
            </Modal.Body>
        </Modal>
    )
}

export default TeamEdit
