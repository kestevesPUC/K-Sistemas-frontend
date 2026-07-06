import React from 'react'
import { ShieldCheck, UserCheck, UserRoundX, Users } from 'lucide-react'
import ResourceCrudPage from '../locacao/components/ResourceCrudPage'
import { mockClients } from './mockClients'

const emptyClient = {
  name: '',
  document: '',
  phone: '',
  email: '',
  birthDate: '',
  status: 'Ativo',
}

const columns = [
  { key: 'name', label: 'Cliente' },
  { key: 'document', label: 'CPF/CNPJ' },
  { key: 'phone', label: 'Telefone' },
  { key: 'email', label: 'E-mail' },
  { key: 'birthDate', label: 'Nascimento', type: 'date' },
  { key: 'status', label: 'Status', type: 'status' },
]

const formFields = [
  { name: 'name', label: 'Nome completo', placeholder: 'Ex: Joao da Silva', required: true },
  { name: 'email', label: 'E-mail', type: 'email', placeholder: 'email@exemplo.com', required: true },
  { name: 'document', label: 'CPF/CNPJ', placeholder: '000.000.000-00', required: true },
  { name: 'phone', label: 'Telefone', placeholder: '(31) 99999-9999', required: true },
  { name: 'birthDate', label: 'Data de nascimento', type: 'date', required: true },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    required: true,
    options: [
      { value: 'Ativo', label: 'Ativo' },
      { value: 'Inativo', label: 'Inativo' },
      { value: 'Bloqueado', label: 'Bloqueado' },
    ],
  },
]

const indicators = [
  { label: 'Clientes', icon: Users, color: 'primary', getValue: (records) => records.length },
  {
    label: 'Ativos',
    icon: UserCheck,
    color: 'success',
    getValue: (records) => records.filter((record) => record.status === 'Ativo').length,
  },
  {
    label: 'Bloqueados',
    icon: UserRoundX,
    color: 'danger',
    getValue: (records) => records.filter((record) => record.status === 'Bloqueado').length,
  },
  {
    label: 'Documentos validos',
    icon: ShieldCheck,
    color: 'info',
    getValue: (records) => records.filter((record) => record.document).length,
  },
]

const statusColorMap = {
  Ativo: 'success',
  Inativo: 'secondary',
  Bloqueado: 'danger',
}

export default function ClientsList() {
  return (
    <ResourceCrudPage
      title="Clientes"
      subtitle="Cadastro de clientes preparado para integracao com paginacao backend."
      createLabel="Novo cliente"
      exportFileName="clientes.csv"
      initialData={mockClients}
      emptyRecord={emptyClient}
      columns={columns}
      formFields={formFields}
      searchableFields={['name', 'document', 'phone', 'email', 'status']}
      indicators={indicators}
      statusColorMap={statusColorMap}
    />
  )
}
