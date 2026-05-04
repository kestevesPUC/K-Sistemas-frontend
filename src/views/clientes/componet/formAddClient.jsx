import React, { useState } from 'react'
import {
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CCol,
} from '@coreui/react'

export default function FormAddClient({ setNewClient }) {
  const [client, setClient] = useState({
    name: '',
    cpf: '',
    phone: '',
    mail: '',
    birthday: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setNewClient((prev) => ({
      ...prev,
      [name]: value,
    }))
    setClient((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <CForm>
      <CRow className="g-4">
        {/* NOME */}
        <CCol md={6}>
          <CFormLabel className="fw-semibold">
            Nome completo <span className="text-danger">*</span>
          </CFormLabel>
          <CFormInput
            name="name"
            placeholder="Ex: João da Silva"
            value={client.name}
            onChange={handleChange}
            required
          />
        </CCol>

        {/* EMAIL */}
        <CCol md={6}>
          <CFormLabel className="fw-semibold">
            Email <span className="text-danger">*</span>
          </CFormLabel>
          <CFormInput
            type="email"
            name="mail"
            placeholder="email@exemplo.com"
            value={client.mail}
            onChange={handleChange}
            required
          />
        </CCol>

        {/* CPF */}
        <CCol md={6}>
          <CFormLabel className="fw-semibold">
            CPF <span className="text-danger">*</span>
          </CFormLabel>
          <CFormInput
            name="cpf"
            placeholder="000.000.000-00"
            value={client.cpf}
            onChange={handleChange}
            required
          />
        </CCol>

        {/* TELEFONE */}
        <CCol md={6}>
          <CFormLabel className="fw-semibold">
            Telefone <span className="text-danger">*</span>
          </CFormLabel>
          <CFormInput
            name="phone"
            placeholder="(31) 99999-9999"
            value={client.phone}
            onChange={handleChange}
            required
          />
        </CCol>

        {/* NASCIMENTO */}
        <CCol md={6}>
          <CFormLabel className="fw-semibold">
            Data de nascimento <span className="text-danger">*</span>
          </CFormLabel>
          <CFormInput
            type="date"
            name="birthday"
            value={client.birthday}
            onChange={handleChange}
            required
          />
        </CCol>
      </CRow>
    </CForm>
  )
}
