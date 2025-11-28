import React, { useState } from 'react'
import ToolBar from '../../components/ToolBar'
import { CButton, CCard, CCardBody, CCol, CFormText, CRow } from '@coreui/react'
import { Plus, Users } from 'lucide-react'
import Card from '../../components/Card'
import { Modal } from '../../components/Modal'
import PhotoCollaborator from './partials/photo-collaborator'
import ModalBody from './partials/modal-body'
import ModalButton from './partials/modal-button'

export default function Collaborator() {

    const [visible, setVisible] = useState(false);
    const [newCollaborator, setNewCollaborator] = useState({});
    const [collaborator, setCollaborator] = useState([
        {
            id: 0,
            name: "Kaio Gomes Esteves Corrêa",
            cpf: "142.583.486-86",
            position: "Analista de Sistemas",
            wage: 6970.00,
            birthday: new Date("1999-02-28 00:00.000"),
            keyPix: "14258348686"
        }
    ])
    return (
        <>
            <ToolBar
                buttons={[
                    <CButton type='button' className='btn justify-content-center' color="primary" variant="outline" onClick={() => setVisible(true)}>
                        <Plus className="mh-3" size={18} />
                        Cadastrar
                    </CButton>
                ]}
            />

            <Card
                title="Funcionários"
                content={
                    <>
                        {
                            collaborator.map(e => (
                                <CCard className='h-10 mt-3 hover-card' type='button'>
                                    <CCardBody>
                                        <CRow className='align-items-center'>
                                            <CCol className='col-md-1'>
                                                <PhotoCollaborator />
                                            </CCol>
                                            <CCol>
                                                <CRow>
                                                    <CCol>
                                                        <CFormText className='fw-bold fs-6'>{e.name}</CFormText>
                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol>
                                                        <CFormText className='text-body-secondary'>{e.position} • {e.cpf}</CFormText>
                                                    </CCol>
                                                </CRow>
                                            </CCol>
                                        </CRow>
                                    </CCardBody>
                                </CCard>
                            ))
                        }
                    </>
                }
            />

            <Modal
                title={"Cadastrar Funcionário"}
                icon={
                    <CRow className='align-items-center'>
                        {<Users />}
                    </CRow>
                }
                body={<ModalBody newCollaborator={newCollaborator} setNewCollaborator={setNewCollaborator} />}
                button={<ModalButton newCollaborator={newCollaborator} setCollaborator={setCollaborator} setVisible={setVisible} />}
                visible={visible}
                setVisible={setVisible}
            />
        </>
    )
}
