import React from 'react'
import { CPagination, CPaginationItem } from '@coreui/react'

export default function TablePagination({ page, pageSize, total, onPageChange }) {
  const totalPages = Math.ceil(total / pageSize)

  if (totalPages <= 1) return null

  return (
    <CPagination align="center" className="mt-4">
      <CPaginationItem
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        type='button'
      >
        Anterior
      </CPaginationItem>

      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1
        return (
          <CPaginationItem
            key={pageNumber}
            active={pageNumber === page}
            onClick={() => onPageChange(pageNumber)}
            type='button'
          >
            {pageNumber}
          </CPaginationItem>
        )
      })}

      <CPaginationItem
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        type='button'
      >
        Próxima
      </CPaginationItem>
    </CPagination>
  )
}
