import { CAvatar, CCol, CImage, CRow } from '@coreui/react'
import React from 'react'
import { PHOTO } from '../../../config/constants'

export default function PhotoCollaborator() {
  return (
      <CAvatar src={PHOTO} size="xl" />
  )
}
