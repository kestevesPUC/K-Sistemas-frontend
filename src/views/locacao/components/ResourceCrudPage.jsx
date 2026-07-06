import React, { useEffect, useMemo, useState } from 'react'
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react'
import { Download, Pencil, Plus, Search, Trash2 } from 'lucide-react'
import CardComponent from '../../../components/CardComponent'
import TablePagination from '../../../components/TablePagination'
import { ModalComponent } from '../../../components/modal/ModalComponent'

const DEFAULT_PAGE_SIZE = 10

const filterRecords = (records, search, searchableFields) => {
  const normalizedSearch = search.trim().toLowerCase()

  if (!normalizedSearch) return records

  return records.filter((record) =>
    searchableFields.some((field) =>
      String(record[field] ?? '').toLowerCase().includes(normalizedSearch),
    ),
  )
}

const getPaginatedResponse = ({ records, page, pageSize, search, searchableFields }) => {
  const filteredRecords = filterRecords(records, search, searchableFields)
  const startIndex = (page - 1) * pageSize

  return {
    data: filteredRecords.slice(startIndex, startIndex + pageSize),
    total: filteredRecords.length,
  }
}

const formatDate = (value) => {
  if (!value) return '-'

  return new Date(value + 'T00:00:00').toLocaleDateString('pt-BR')
}

const StatusBadge = ({ value, colorMap }) => (
  <CBadge color={colorMap[value] ?? 'secondary'} shape="rounded-pill">
    {value}
  </CBadge>
)

const IndicatorCard = ({ icon: Icon, label, value, color = 'primary' }) => (
  <CCol sm={6} xl={3}>
    <CCard className="h-100 border-0 shadow-sm">
      <CCardBody className="d-flex align-items-center gap-3">
        <div
          className={'bg-' + color + ' bg-opacity-10 text-' + color + ' d-flex align-items-center justify-content-center rounded'}
          style={{ width: 44, height: 44 }}
        >
          <Icon size={22} />
        </div>
        <div>
          <div className="text-medium-emphasis small">{label}</div>
          <div className="fs-4 fw-semibold lh-sm">{value}</div>
        </div>
      </CCardBody>
    </CCard>
  </CCol>
)

const ResourceForm = ({ fields, formId, initialValues, onSubmit }) => {
  const [formData, setFormData] = useState(initialValues)

  useEffect(() => {
    setFormData(initialValues)
  }, [initialValues])

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(formData)
  }

  return (
    <CForm id={formId} onSubmit={handleSubmit}>
      <CRow className="g-3">
        {fields.map((field) => (
          <CCol md={field.md ?? 6} key={field.name}>
            <CFormLabel className="fw-semibold">
              {field.label}
              {field.required && <span className="text-danger"> *</span>}
            </CFormLabel>
            {field.type === 'select' ? (
              <CFormSelect
                name={field.name}
                value={formData[field.name] ?? ''}
                onChange={handleChange}
                required={field.required}
              >
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </CFormSelect>
            ) : (
              <CFormInput
                type={field.type ?? 'text'}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name] ?? ''}
                onChange={handleChange}
                required={field.required}
              />
            )}
          </CCol>
        ))}
      </CRow>
    </CForm>
  )
}

export default function ResourceCrudPage({
  title,
  subtitle,
  createLabel,
  exportFileName,
  initialData,
  emptyRecord,
  columns,
  formFields,
  searchableFields,
  indicators,
  statusColorMap = {},
}) {
  const [records, setRecords] = useState(initialData)
  const [rows, setRows] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize] = useState(DEFAULT_PAGE_SIZE)
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [editingRecord, setEditingRecord] = useState(null)

  const formId = exportFileName + '-form'

  useEffect(() => {
    const response = getPaginatedResponse({
      records,
      page,
      pageSize,
      search,
      searchableFields,
    })

    setRows(response.data)
    setTotal(response.total)
  }, [records, page, pageSize, search, searchableFields])

  useEffect(() => {
    setPage(1)
  }, [search])

  const indicatorValues = useMemo(
    () => indicators.map((indicator) => ({ ...indicator, value: indicator.getValue(records) })),
    [indicators, records],
  )

  const openCreateModal = () => {
    setEditingRecord(null)
    setModalVisible(true)
  }

  const openEditModal = (record) => {
    setEditingRecord(record)
    setModalVisible(true)
  }

  const handleSubmit = (formData) => {
    if (editingRecord) {
      setRecords((current) =>
        current.map((record) =>
          record.id === editingRecord.id ? { ...editingRecord, ...formData } : record,
        ),
      )
    } else {
      setRecords((current) => [{ ...emptyRecord, ...formData, id: Date.now() }, ...current])
    }

    setModalVisible(false)
  }

  const handleDelete = (record) => {
    if (!window.confirm('Deseja excluir "' + (record.name ?? record.plate) + '"?')) return

    setRecords((current) => current.filter((item) => item.id !== record.id))
  }

  const handleExport = () => {
    const header = columns.map((column) => column.label)
    const rows = records.map((record) =>
      columns
        .map((column) => {
          const value = record[column.key]
          return column.type === 'date' ? formatDate(value) : value
        })
        .join(';'),
    )

    const csvContent = 'data:text/csv;charset=utf-8,' + [header.join(';'), ...rows].join('\n')
    const link = document.createElement('a')
    link.href = encodeURI(csvContent)
    link.download = exportFileName
    link.click()
  }

  const renderCell = (record, column) => {
    const value = record[column.key]

    if (column.type === 'date') return formatDate(value)
    if (column.type === 'status') return <StatusBadge value={value} colorMap={statusColorMap} />
    if (column.render) return column.render(record)

    return value || '-'
  }

  const modalTitle = editingRecord ? 'Editar ' + title.toLowerCase() : createLabel

  return (
    <>
      <CardComponent
        title={title}
        content={
          <>
            <div className="d-flex flex-column flex-xl-row align-items-xl-center justify-content-between gap-3 mb-4">
              <div className="text-medium-emphasis">{subtitle}</div>
              <div className="d-flex flex-column flex-sm-row gap-2">
                <CButton color="primary" className="d-inline-flex align-items-center gap-2" onClick={openCreateModal}>
                  <Plus size={18} />
                  {createLabel}
                </CButton>
                <CButton
                  color="secondary"
                  variant="outline"
                  className="d-inline-flex align-items-center gap-2"
                  onClick={handleExport}
                >
                  <Download size={18} />
                  Exportar
                </CButton>
              </div>
            </div>

            <CRow className="g-3 mb-4">
              {indicatorValues.map((indicator) => (
                <IndicatorCard key={indicator.label} {...indicator} />
              ))}
            </CRow>

            <CInputGroup className="mb-3">
              <CInputGroupText>
                <Search size={18} />
              </CInputGroupText>
              <CFormInput
                placeholder="Buscar registros"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </CInputGroup>

            <CTable hover responsive align="middle" className="mb-0">
              <CTableHead>
                <CTableRow>
                  {columns.map((column) => (
                    <CTableHeaderCell key={column.key}>{column.label}</CTableHeaderCell>
                  ))}
                  <CTableHeaderCell className="text-center">Acoes</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {rows.map((record) => (
                  <CTableRow key={record.id}>
                    {columns.map((column) => (
                      <CTableDataCell key={column.key}>{renderCell(record, column)}</CTableDataCell>
                    ))}
                    <CTableDataCell className="text-center">
                      <CButtonGroup>
                        <CTooltip content="Editar">
                          <CButton color="warning" variant="outline" size="sm" onClick={() => openEditModal(record)}>
                            <Pencil size={16} />
                          </CButton>
                        </CTooltip>
                        <CTooltip content="Excluir">
                          <CButton color="danger" variant="outline" size="sm" onClick={() => handleDelete(record)}>
                            <Trash2 size={16} />
                          </CButton>
                        </CTooltip>
                      </CButtonGroup>
                    </CTableDataCell>
                  </CTableRow>
                ))}
                {!rows.length && (
                  <CTableRow>
                    <CTableDataCell colSpan={columns.length + 1} className="text-center text-medium-emphasis py-5">
                      Nenhum registro encontrado
                    </CTableDataCell>
                  </CTableRow>
                )}
              </CTableBody>
            </CTable>

            <TablePagination page={page} pageSize={pageSize} total={total} onPageChange={setPage} />
          </>
        }
      />

      <ModalComponent
        visible={modalVisible}
        setVisible={setModalVisible}
        title={modalTitle}
        size="lg"
        body={
          <ResourceForm
            fields={formFields}
            formId={formId}
            initialValues={editingRecord ?? emptyRecord}
            onSubmit={handleSubmit}
          />
        }
        button={
          <CButton color="primary" type="submit" form={formId}>
            Salvar
          </CButton>
        }
      />
    </>
  )
}
