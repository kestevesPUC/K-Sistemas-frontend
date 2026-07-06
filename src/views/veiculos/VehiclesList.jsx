import React from 'react'
import { Car, CircleDollarSign, Gauge, Wrench } from 'lucide-react'
import ResourceCrudPage from '../locacao/components/ResourceCrudPage'
import { mockVehicles } from './mockVehicles'

const emptyVehicle = {
  plate: '',
  model: '',
  brand: '',
  year: '',
  dailyRate: '',
  category: '',
  status: 'Disponivel',
}

const columns = [
  { key: 'plate', label: 'Placa' },
  { key: 'model', label: 'Modelo' },
  { key: 'brand', label: 'Marca' },
  { key: 'year', label: 'Ano' },
  {
    key: 'dailyRate',
    label: 'Diaria',
    render: (record) =>
      Number(record.dailyRate || 0).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
  },
  { key: 'category', label: 'Categoria' },
  { key: 'status', label: 'Status', type: 'status' },
]

const formFields = [
  { name: 'plate', label: 'Placa', placeholder: 'ABC-1D23', required: true },
  { name: 'model', label: 'Modelo', placeholder: 'Ex: Onix Plus', required: true },
  { name: 'brand', label: 'Marca', placeholder: 'Ex: Chevrolet', required: true },
  { name: 'year', label: 'Ano', type: 'number', placeholder: '2024', required: true },
  { name: 'dailyRate', label: 'Valor da diaria', type: 'number', placeholder: '189.90', required: true },
  { name: 'category', label: 'Categoria', placeholder: 'Ex: Sedan', required: true },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    required: true,
    options: [
      { value: 'Disponivel', label: 'Disponivel' },
      { value: 'Locado', label: 'Locado' },
      { value: 'Manutencao', label: 'Manutencao' },
      { value: 'Inativo', label: 'Inativo' },
    ],
  },
]

const indicators = [
  { label: 'Frota', icon: Car, color: 'primary', getValue: (records) => records.length },
  {
    label: 'Disponiveis',
    icon: Gauge,
    color: 'success',
    getValue: (records) => records.filter((record) => record.status === 'Disponivel').length,
  },
  {
    label: 'Em manutencao',
    icon: Wrench,
    color: 'warning',
    getValue: (records) => records.filter((record) => record.status === 'Manutencao').length,
  },
  {
    label: 'Ticket medio',
    icon: CircleDollarSign,
    color: 'info',
    getValue: (records) => {
      if (!records.length) return 'R$ 0,00'
      const total = records.reduce((sum, record) => sum + Number(record.dailyRate || 0), 0)
      return (total / records.length).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
    },
  },
]

const statusColorMap = {
  Disponivel: 'success',
  Locado: 'primary',
  Manutencao: 'warning',
  Inativo: 'secondary',
}

export default function VehiclesList() {
  return (
    <ResourceCrudPage
      title="Veiculos"
      subtitle="Cadastro da frota com estados operacionais e controle de diaria."
      createLabel="Novo veiculo"
      exportFileName="veiculos.csv"
      initialData={mockVehicles}
      emptyRecord={emptyVehicle}
      columns={columns}
      formFields={formFields}
      searchableFields={['plate', 'model', 'brand', 'year', 'category', 'status']}
      indicators={indicators}
      statusColorMap={statusColorMap}
    />
  )
}
