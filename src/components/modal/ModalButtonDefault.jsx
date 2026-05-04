import { CButton } from '@coreui/react'
import React from 'react'

export default function ModalButtonDefault({ name = "Salvar", enabled = true, func = () => { console.log("Clicou butão modal") } }) {
    return (
        <CButton
            color="primary"
            variant="outline"
            disabled={!enabled}
            onClick={func}
        >
            {name}
        </CButton>
    )
}
