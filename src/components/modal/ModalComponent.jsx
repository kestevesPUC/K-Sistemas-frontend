import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
} from '@coreui/react'

export const ModalComponent = ({
    visible,
    setVisible,
    title = 'Modal',
    body,
    button,
    icon,
    buttonClose = 'Cancelar',
    size = 'md',
    loading = false,
}) => {
    return (
        <CModal
            alignment="center"
            visible={visible}
            size={size}
            onClose={() => !loading && setVisible(false)}
            backdrop={loading ? 'static' : true}
            keyboard={!loading}
        >
            {/* HEADER */}
            <CModalHeader>
                <div className="d-flex align-items-center gap-3">
                    {icon && (
                        <div
                            className="
                                d-flex 
                                align-items-center 
                                justify-content-center 
                                rounded-circle 
                                bg-light 
                                text-primary
                            "
                            style={{ width: 40, height: 40 }}
                        >
                            {icon}
                        </div>
                    )}

                    <CModalTitle className="fw-semibold">
                        {title}
                    </CModalTitle>
                </div>
            </CModalHeader>

            {/* BODY */}
            <CModalBody>
                {body}
            </CModalBody>

            {/* FOOTER */}
            <CModalFooter>
                <div className="d-flex justify-content-end gap-2 w-100">
                    <CButton
                        color="secondary"
                        variant="outline"
                        disabled={loading}
                        onClick={() => setVisible(false)}
                    >
                        {buttonClose}
                    </CButton>

                    {button &&
                        (loading ? (
                            <CButton color="primary" disabled>
                                Processando...
                            </CButton>
                        ) : (
                            button
                        ))}
                </div>
            </CModalFooter>
        </CModal>
    )
}