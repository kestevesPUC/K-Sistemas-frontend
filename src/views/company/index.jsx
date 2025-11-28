import React, { useState } from 'react'
import Card from '../../components/Card'
import { Building2, Plus } from 'lucide-react';
import { CButton, CCard, CCardBody, CCol, CFormText, CRow } from '@coreui/react';
import ToolBar from '../../components/ToolBar';
import { Modal } from '../../components/Modal';
import IconEmpresa from './partials/company-icon';
import ModalBody from './partials/modal-body';
import ModalButton from './partials/modal-button';

export default function Company() {
  const [visible, setVisible] = useState(false);
  const [newComapany, setNewCompany] = useState({
    name: "",
    cnpj: "",
    city: ""
  });
  const [company, setCompany] = useState([
    {
      name: "Empresa 1",
      cnpj: "12.321.125/0001-25",
      city: "Belo Horizonte"
    },
    {
      name: "Empresa 2",
      cnpj: "12.321.125/0001-25",
      city: "Contagem"
    },
    {
      name: "Empresa 3",
      cnpj: "12.321.125/0001-25",
      city: "Betim"
    },
  ]);


  return (
    <>
      <ToolBar
        buttons={[
          <CButton type='button' className='btn justify-content-center' color="primary" variant="outline" onClick={() => setVisible(true)}>
            <Plus className="mh-3" size={18} />
            Cadastrar
          </CButton>
        ]}
      />

      <Card
        title="Empresas"
        content={
          <>
            {
              company.map(e => (
                <CCard className='h-10 mt-3 hover-card' type='button'>
                  <CCardBody>
                    <CRow className='align-items-center'>
                      <IconEmpresa />
                      <CCol>
                        <CRow>
                          <CCol>
                            <CFormText className='fw-bold fs-6'>{e.name}</CFormText>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol>
                            <CFormText className='text-body-secondary'>{e.cnpj} • {e.city}</CFormText>
                          </CCol>
                        </CRow>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              ))
            }
          </>
        }
      />

      <Modal
        title={"Cadastrar Empresa"}
        icon={
          <CRow className='align-items-center'>
            <IconEmpresa />
          </CRow>
        }

        body={<ModalBody newCompany={newComapany} setNewCompany={setNewCompany} />}
        button={<ModalButton newCompany={newComapany} setCompany={setCompany} setVisible={setVisible}/>}
        visible={visible}
        setVisible={setVisible}
      />
    </>
  )
}
