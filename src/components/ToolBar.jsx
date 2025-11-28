import { CCol, CRow } from '@coreui/react'

export default function ToolBar({ buttons }) {
    return (
        <CRow className='mb-2 text-end'>


            <div className="d-flex justify-content-end gap-2">

                {buttons?.map((btn, index) => (
                   btn
                ))}
            </div>
        </CRow>
    )
}
