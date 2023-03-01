import React from 'react'
import * as XLSX from 'xlsx'
import { Box } from '@mui/system'
import { IconButton } from '@mui/material'
import FileUploadIcon from '@mui/icons-material/FileUpload'
const ImportExcel = ({ products, setProducts, setMessage }) => {
  const handleRequestImport = (e) => {
    console.log(e.target.files[0])
    const uploadedFile = e.target.files[0]
    const fileReader = new FileReader()

    fileReader.readAsArrayBuffer(uploadedFile)
    fileReader.onload = (e) => {
      console.log(e)
      const bufferArray = e.target.result
      const workbook = XLSX.read(bufferArray)
      console.log(workbook)
      const data = XLSX.utils.sheet_to_json(
        workbook.Sheets[workbook.SheetNames[0]],
        { header: 1 }
      )
      console.log(data)
      const SliceRows = data.slice(1).map((r) =>
        r.reduce((acc, x, i) => {
          acc[data[0][i]] = x
          //console.log(x)
          return acc
        }, {})
      )
      setProducts(
        SliceRows.map((pro) => pro),
        ...products
      )
      setMessage('import-success')
    }
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <p>Import Excel</p>

      <IconButton component="label">
        <input
          id="choose-file"
          type="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          hidden
          onChange={(e) => {
            handleRequestImport(e)
          }}
        />
        <FileUploadIcon />
      </IconButton>
    </Box>
  )
}

export default ImportExcel
