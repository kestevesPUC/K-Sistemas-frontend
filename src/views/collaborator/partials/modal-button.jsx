import { CButton } from "@coreui/react";

export default function ModalButton({ setCollaborator, newCollaborator, setVisible }) {

    const click = () => {
        setCollaborator(prevCollaborator => [...prevCollaborator, newCollaborator]);
        setVisible(false)   
    }

    return (
        <CButton className='btn btn-primary' onClick={click}>
            Salvar
        </CButton>
    )
}
