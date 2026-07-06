import { CCol, CFormInput, CFormLabel, CRow } from '@coreui/react'
import React from 'react'

export default function FormComponent({nome, setNome, cpf, setCpf}) {
  return (
    <>
      <CRow>
        <CCol>
          <CFormLabel>Nome</CFormLabel>
          <CFormInput value={nome} onChange={(e) => setNome(e.target.value)} />
        </CCol>
        <CCol>
          <CFormLabel>CPF</CFormLabel>
          <CFormInput value={cpf} onChange={(e) => setCpf(e.target.value)} />
        </CCol>
      </CRow>
    </>
  )
}
