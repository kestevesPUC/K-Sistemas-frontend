import { CCol, CFormInput, CFormLabel, CRow } from '@coreui/react'
import React from 'react'

export default function ModalBody({ newCollaborator, setNewCollaborator }) {
    return (
        <>
            <CRow>
                <CCol>
                    <CFormLabel>
                        Nome: <span className="text-danger">*</span>
                    </CFormLabel>
                    <CFormInput
                        value={newCollaborator.name}
                        onChange={(e) => setNewCollaborator({ ...newCollaborator, name: e.target.value })}
                    />
                </CCol>
            </CRow>

            <CRow className='mt-2'>
                <CCol>
                    <CFormLabel>
                        CPF: <span className="text-danger">*</span>
                    </CFormLabel>
                    <CFormInput
                        value={newCollaborator.cpf}
                        onChange={(e) => setNewCollaborator({ ...newCollaborator, cpf: e.target.value })}
                    />
                </CCol>
            </CRow>

            <CRow className='mt-2'>
                <CCol>
                    <CFormLabel>
                        Cargo: <span className="text-danger">*</span>
                    </CFormLabel>
                    <CFormInput
                        value={newCollaborator.position}
                        onChange={(e) => setNewCollaborator({ ...newCollaborator, position: e.target.value })}
                    />
                </CCol>
            </CRow>

            <CRow className='mt-2'>
                <CCol>
                    <CFormLabel>
                        Salário: <span className="text-danger">*</span>
                    </CFormLabel>
                    <CFormInput
                            type='number'
                        value={newCollaborator.wage}
                        onChange={(e) => setNewCollaborator({ ...newCollaborator, wage: e.target.value })}
                    />
                </CCol>
            </CRow>
        </>
    )
}
