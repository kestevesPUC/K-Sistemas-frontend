import { useState } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

export const Modal = ({  visible, setVisible, title, body, button, icon }) => {
    
    return (
        <>
            <CModal
                alignment="center"
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="modal"
            >
                <CModalHeader className='gap-2'>
                    {icon}
                    <CModalTitle id="modal">{title ?? "Modal Title"}</CModalTitle>  
                </CModalHeader>
                <CModalBody>
                    {body}
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Fechar
                    </CButton>
                    {button}
                </CModalFooter>
            </CModal>
        </>
    )
}