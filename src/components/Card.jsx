import { CCard, CCardBody, CCol, CFormText, CRow } from '@coreui/react'
import React from 'react'

export default function Card({ title, content }) {
    return (
        <CCard className='mb-3 card-blue-edge card-square'>
            <CCardBody>
                <>
                    <CRow>
                        <CCol>
                            <CFormText className='fw-bold fs-5'>
                                {title}
                            </CFormText>
                        </CCol>
                    </CRow>
                    <CRow className='mt-3' >
                        <CCol>
                            {content}
                        </CCol>
                    </CRow>
                </>
            </CCardBody>
        </CCard>
    )
}
