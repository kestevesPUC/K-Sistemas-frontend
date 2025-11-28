import { CButton } from '@coreui/react'
import React from 'react'

export default function ModalButton({ setCompany, newCompany, setVisible }) {

    const click = () => {
        setCompany(prevCompany => [...prevCompany, newCompany]);
        setVisible(false)
    }

    return (
        <CButton className='btn btn-primary' onClick={click}>
            Salvar
        </CButton>
    )
}
