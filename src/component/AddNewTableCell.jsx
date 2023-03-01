import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import CancelIcon from '@mui/icons-material/Cancel'
import { IconButton } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { useState } from 'react'
import { useRef } from 'react'
const AddNEwTableCell = ({
  addData,
  setImgFile,
  onCancel,
  setPreview,
  preview,
  setSelectedFile,
}) => {
  const [newProduct, setNewProduct] = useState({})
  const inputRef = useRef(null)
  console.log(preview)
  const getText = (e) => {
    console.log(e.target.value)
    console.log(e.target.name)
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
    console.log(newProduct)
  }

  return (
    <TableRow>
      <TableCell width={120} align="center">
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue=""
          name="title"
          onChange={(e) => getText(e)}
        />
      </TableCell>
      <TableCell width={120} align="center">
        <TextField
          required
          type="number"
          name="price"
          InputProps={{ inputProps: { min: 0 } }}
          onChange={(e) => getText(e)}
        />
      </TableCell>
      <TableCell align="center" width={120}>
        <Box component="img" alt="" src={preview} width={80} height={60} />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label">
          <input
            hidden
            accept="image/*"
            ref={inputRef}
            type="file"
            onChange={(e) => {
              setImgFile(e.target.files[0])
              setSelectedFile(e.target.files[0])
            }}
          />
          <FileUploadIcon />
        </IconButton>
      </TableCell>
      <TableCell width={120} align="center">
        <TextField
          required
          name="description"
          id="outlined-required"
          label="Required"
          defaultValue=""
          onChange={(e) => getText(e)}
        />
      </TableCell>
      <TableCell align="center" width={120}>
        <IconButton
          onClick={() => {
            addData(newProduct)
            setPreview(undefined)
          }}>
          <CheckIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            onCancel()
            setPreview(undefined)
          }}>
          <CancelIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
export default AddNEwTableCell
