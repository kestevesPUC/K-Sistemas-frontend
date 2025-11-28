import { CButton, CCol, CRow } from '@coreui/react'
import { Building2 } from 'lucide-react'
import React from 'react'

export default function IconEmpresa() {
    return (
        <CCol className='col-1'>
            <CButton className="rounded-5 bg-info bg-opacity-10">
                <Building2 className="text-primary" size={33} />
            </CButton>
        </CCol>
    )
}
