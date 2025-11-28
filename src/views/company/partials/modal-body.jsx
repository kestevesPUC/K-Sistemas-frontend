import { CCol, CFormInput, CFormLabel, CRow } from '@coreui/react'
import React from 'react'

export default function ModalBody({ newCompany, setNewCompany }) {
    return (
        <>
            <CRow>
                <CCol>
                    <CFormLabel>
                        Nome: <span className="text-danger">*</span>
                    </CFormLabel>
                    <CFormInput
                        value={newCompany.name}
                        onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                    />
                </CCol>
            </CRow>

            <CRow className='mt-2'>
                <CCol>
                    <CFormLabel>
                        CNPJ: <span className="text-danger">*</span>
                    </CFormLabel>
                    <CFormInput
                        value={newCompany.cnpj}
                        onChange={(e) => setNewCompany({ ...newCompany, cnpj: e.target.value })}
                    />
                </CCol>
            </CRow>

            <CRow className='mt-2'>
                <CCol>
                    <CFormLabel>
                        Cidade: <span className="text-danger">*</span>
                    </CFormLabel>
                    <CFormInput
                        value={newCompany.city}
                        onChange={(e) => setNewCompany({ ...newCompany, city: e.target.value })}
                    />
                </CCol>
            </CRow>
        </>
    )
}
