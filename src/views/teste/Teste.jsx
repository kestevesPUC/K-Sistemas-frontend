import React, { useState } from 'react'
import { ModalComponent } from '../../components/modal/ModalComponent'
import { CButton, CCol, CFormInput, CFormLabel, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import FormComponent from './component/FormComponent';

export default function Teste() {
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [newClient, setNewClient] = useState({
        id: 0,
        name: '',
        cpf: ''
    });

    const [items, setItems] = useState([
        {
            id: 1,
            name: 'Kaio',
            cpf: '12345678'
        },
        {
            id: 2,
            name: 'Isac',
            cpf: '87654321'
        },
        {
            id: 3,
            name: 'Kelvin',
            cpf: '852456'
        },
        {
            id: 4,
            name: 'Paulo',
            cpf: '654258'
        },
    ]);

    const column = [
        {
            key: 'id',
            label: 'Id',
            _props: { scope: 'col' },
        },
        {
            key: 'name',
            label: 'Nome',
            _props: { scope: 'col' },
        },
        {
            key: 'cpf',
            label: 'CPF',
            _props: { scope: 'col' },
        },
    ]

    const handleSave = () => {
        let newClient = items;
        newClient.push({
            id: (items[items.length - 1].id + 1),
            name: nome,
            cpf: cpf
        });

        setItems(newClient);
        setVisible(false)
    }

    const handleDelete = (id) => {
        const cientesArr = [];

        items.forEach(cliente => {
            if (cliente.id != id) {
                cientesArr.push(cliente);
            }
        });


        setItems(cientesArr);

    }

    const handleEdit = (cliente) => {
        setVisible2(true)
        setNewClient(cliente);
    }

    const editar = () => {
        const clientesArr = [];

        items.forEach(cliente => {
            if (cliente.id == newClient.id) {
                clientesArr.push(newClient);
            } else {
                clientesArr.push(cliente);
            }
        });

        setVisible2(false);

        setItems(clientesArr);
    }

    const bodyModal = () => {
        return (
            <>
                <CRow>
                    <CCol>
                        <CFormLabel>Nome</CFormLabel>
                        <CFormInput value={newClient.name} onChange={(e) => setNewClient((prev) => ({
                            ...prev,
                            name: e.target.value
                        }))}
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol>
                        <CFormLabel>CPF</CFormLabel>
                        <CFormInput value={newClient.cpf} onChange={(e) => setNewClient((prev) => ({
                            ...prev,
                            cpf: e.target.value
                        }))} />
                    </CCol>
                </CRow>
            </>
        )
    }

    return (
        <>
            <CRow className='mb-3'>
                <CCol>
                    <CButton className='btn btn-primary' onClick={() => setVisible(true)}>Cadastrar</CButton>
                </CCol>
            </CRow>

            <CTable >
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
                        <CTableHeaderCell scope="col">CPF</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {
                        items.map(cliente => {
                            return (
                                <CTableRow>
                                    <CTableDataCell >{cliente.id}</CTableDataCell>
                                    <CTableDataCell>{cliente.name}</CTableDataCell>
                                    <CTableDataCell>{cliente.cpf}</CTableDataCell>
                                    <CTableDataCell>
                                        <CButton className='btn btn-dark' onClick={() => handleEdit(cliente)}>Editar </CButton>
                                        <CButton className='btn btn-primary' onClick={() => handleDelete(cliente.id)}>Deletar</CButton>
                                    </CTableDataCell>
                                </CTableRow>
                            )
                        })
                    }
                </CTableBody>
            </CTable>

            <ModalComponent
                visible={visible}
                setVisible={setVisible}
                title='Cadastrar Cliente'
                button={<CButton className='btn btn-primary' onClick={handleSave} >Salvar</CButton>}
                body={<FormComponent nome={nome} setNome={setNome} cpf={cpf} setCpf={setCpf} />}
            />

            <ModalComponent
                visible={visible2}
                setVisible={setVisible2}
                title='Editar Cliente'
                button={<CButton className='btn btn-primary' onClick={editar} >Salvar</CButton>}
                body={bodyModal()}
            />
        </>
    )
}
