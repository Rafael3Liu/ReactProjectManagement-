import React from 'react'
import * as XLSX from 'xlsx'
import { Box } from '@mui/system'
import { IconButton } from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
const ExportExcel = ({ products, setMessage }) => {
  const handleExport = (products) => {
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(products)

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products')
    XLSX.writeFile(workbook, 'rafael.xlsx')

    setMessage('export-success')
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <p>Export Excel</p>
      <IconButton onClick={() => handleExport(products)}>
        <FileDownloadIcon />
      </IconButton>
    </Box>
  )
}

export default ExportExcel
