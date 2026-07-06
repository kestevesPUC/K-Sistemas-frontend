import React from 'react'
import { CPagination, CPaginationItem } from '@coreui/react'

const getVisiblePages = (page, totalPages) => {
  const pages = new Set([1, totalPages, page - 1, page, page + 1])

  return [...pages]
    .filter((pageNumber) => pageNumber >= 1 && pageNumber <= totalPages)
    .sort((a, b) => a - b)
}

export default function TablePagination({ page, pageSize, total, onPageChange }) {
  const totalPages = Math.ceil(total / pageSize)
  const visiblePages = getVisiblePages(page, totalPages)

  if (totalPages <= 1) return null

  return (
    <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 mt-4">
      <small className="text-medium-emphasis">
        Pagina {page} de {totalPages} - {total} registros
      </small>

      <CPagination align="center" className="mb-0">
        <CPaginationItem disabled={page === 1} onClick={() => onPageChange(page - 1)} type="button">
          Anterior
        </CPaginationItem>

        {visiblePages.map((pageNumber, index) => {
          const previousPage = visiblePages[index - 1]
          const hasGap = previousPage && pageNumber - previousPage > 1

          return (
            <React.Fragment key={pageNumber}>
              {hasGap && <CPaginationItem disabled>...</CPaginationItem>}
              <CPaginationItem
                active={pageNumber === page}
                onClick={() => onPageChange(pageNumber)}
                type="button"
              >
                {pageNumber}
              </CPaginationItem>
            </React.Fragment>
          )
        })}

        <CPaginationItem
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          type="button"
        >
          Proxima
        </CPaginationItem>
      </CPagination>
    </div>
  )
}
