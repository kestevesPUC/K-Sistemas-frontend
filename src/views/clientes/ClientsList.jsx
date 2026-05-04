import React, { useEffect, useState } from 'react'
import {
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CTooltip,
} from '@coreui/react'

import { CIcon } from '@coreui/icons-react'
import {
    cilPencil,
    cilTrash,
    cilPlus,
    cilCloudDownload,
} from '@coreui/icons'

import { mockClients } from './mockClients'
import TablePagination from '../../components/TablePagination'
import { ModalComponent } from '../../components/modal/ModalComponent'
import modalBodyAddClient from './componet/formAddClient'
import ModalButtonDefault from '../../components/modal/ModalButtonDefault'
import FormAddClient from './componet/formAddClient'
import CardComponent from '../../components/CardComponent'

const PAGE_SIZE = 10

const ClientsList = () => {
    const [clients, setClients] = useState([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [visible, setVisible] = useState()
    const [title, setTitle] = useState()
    const [button, setButton] = useState()
    const [icon, setIcon] = useState()

    // Simulação de paginação backend
    useEffect(() => {
        const startIndex = (page - 1) * PAGE_SIZE
        const endIndex = startIndex + PAGE_SIZE

        setClients(mockClients.slice(startIndex, endIndex))
        setTotal(mockClients.length)
    }, [page])

    const handleEdit = (client) => {
        console.log('Editar cliente:', client)
    }

    const handleDelete = (clientId) => {
        console.log('Deletar cliente ID:', clientId)
    }

    const handleCreate = () => {
        setVisible(true);
    }

    const handleExport = () => {
        // Simulação de exportação CSV
        const header = ['ID', 'Nome', 'CPF', 'Telefone', 'Nascimento']
        const rows = mockClients.map((c) =>
            [c.id, c.nome, c.cpf, c.telefone, c.nascimento].join(';'),
        )

        const csvContent =
            'data:text/csv;charset=utf-8,' +
            [header.join(';'), ...rows].join('\n')

        const link = document.createElement('a')
        link.href = encodeURI(csvContent)
        link.download = 'clientes.csv'
        link.click()
    }

    return (
        <>

            <CRow className="justify-content-end mb-2">
                <CCol xs="auto">
                    <CButton variant="outline" color="primary" className='me-2' onClick={handleCreate} >
                        <CIcon icon={cilPlus} className="ml-2" />
                        Novo Cliente
                    </CButton>

                    <CButton variant="outline" color="secondary" onClick={handleExport} title='Exportar'>
                        <CIcon icon={cilCloudDownload} />
                    </CButton>
                </CCol>
            </CRow>
            <CardComponent
                title="Lista de Clientes"
                content={
                    <>
                        <CTable striped hover responsive align="middle">
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell>ID</CTableHeaderCell>
                                    <CTableHeaderCell>Nome</CTableHeaderCell>
                                    <CTableHeaderCell>CPF</CTableHeaderCell>
                                    <CTableHeaderCell>Telefone</CTableHeaderCell>
                                    <CTableHeaderCell>Nascimento</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">
                                        Ações
                                    </CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>

                            <CTableBody>
                                {clients.map((client) => (
                                    <CTableRow key={client.id}>
                                        <CTableDataCell>{client.id}</CTableDataCell>
                                        <CTableDataCell>{client.nome}</CTableDataCell>
                                        <CTableDataCell>{client.cpf}</CTableDataCell>
                                        <CTableDataCell>{client.telefone}</CTableDataCell>
                                        <CTableDataCell>
                                            {new Date(client.nascimento).toLocaleDateString('pt-BR')}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                            <CButtonGroup>
                                                <CTooltip content="Editar cliente">
                                                    <CButton
                                                        color="warning"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleEdit(client)}
                                                    >
                                                        <CIcon icon={cilPencil} />
                                                    </CButton>
                                                </CTooltip>

                                                <CTooltip content="Excluir cliente">
                                                    <CButton
                                                        color="danger"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleDelete(client.id)}
                                                    >
                                                        <CIcon icon={cilTrash} />
                                                    </CButton>
                                                </CTooltip>
                                            </CButtonGroup>
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                    </>
                }
            />

            {/* PAGINATION */}
            <TablePagination
                page={page}
                pageSize={PAGE_SIZE}
                total={total}
                onPageChange={setPage}
            />

            {/* MODAL */}
            <ModalComponent
                visible={visible}
                setVisible={setVisible}
                title={title}
                body={<FormAddClient />}
                button={<ModalButtonDefault />}
                size='lg'
                icon={icon}
            />
        </>
    )
}

export default ClientsList