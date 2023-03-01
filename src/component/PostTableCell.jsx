import React from 'react'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Box from '@mui/material/Box'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CancelIcon from '@mui/icons-material/Cancel'
import { useState } from 'react'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import TextField from '@mui/material/TextField'
const PostTableCell = ({
  product,
  editNum,
  handleClick,
  onDelete,
  onToggle,
  index,
  productsOpacity,
  onCancel,
  setImgFile,
  addData,
  setPreview,
  preview,
  setSelectedFile,
  setAddNew,
}) => {
  {
    const [editProduct, setEditProduct] = useState({})
    const getEditContent = (e) => {
      console.log(e.target.value)
      console.log(e.target.name)
      setEditProduct({ ...editProduct, [e.target.name]: e.target.value })
      console.log(editProduct)
    }

    return (
      <TableRow
        hover
        onClick={(event) => handleClick(event, product.title)}
        key={index}
        sx={{
          opacity: productsOpacity ? '0.2' : '1',
        }}>
        <TableCell component="th" scope="row" padding="normal" align="center">
          {editNum === index ? (
            <TextField
              required
              id="outlined-required"
              label="Required"
              defaultValue={product.title}
              name="title"
              onChange={(e) => getEditContent(e)}
            />
          ) : (
            product.title
          )}
        </TableCell>
        <TableCell align="center">
          {editNum === index ? (
            <TextField
              required
              type="number"
              name="price"
              InputProps={{ inputProps: { min: 0 } }}
              defaultValue={product.price}
              onChange={(e) => getEditContent(e)}
            />
          ) : (
            parseInt(product.price)
          )}
        </TableCell>

        <TableCell align="center">
          {editNum === index ? (
            <Box>
              <Box
                component="img"
                alt=""
                src={
                  preview
                    ? preview
                    : `https://app.spiritx.co.nz/storage/${product.product_image}`
                }
                width={80}
                height={60}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label">
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(e) => {
                    setImgFile(e.target.files[0])
                    setSelectedFile(e.target.files[0])
                  }}
                />
                <FileUploadIcon />
              </IconButton>
            </Box>
          ) : (
            <Box
              component="img"
              alt=""
              src={`https://app.spiritx.co.nz/storage/${product.product_image}`}
              width={80}
              height={60}
            />
          )}
        </TableCell>

        <TableCell align="center">
          {editNum === index ? (
            <TextField
              required
              name="description"
              id="outlined-required"
              label="Required"
              defaultValue={product.description}
              onChange={(e) => getEditContent(e)}
            />
          ) : (
            product.description
          )}
        </TableCell>
        <TableCell align="center">
          {editNum === index ? (
            <>
              <IconButton onClick={() => addData(editProduct)}>
                <CheckIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  onCancel()
                  setPreview(undefined)
                }}>
                <CancelIcon />
              </IconButton>
            </>
          ) : (
            <>
              <ModeEditIcon
                onClick={() => {
                  onToggle(index)
                  setEditProduct(product)
                  setAddNew(false)
                }}></ModeEditIcon>
              <DeleteIcon onClick={() => onDelete(product.id)}></DeleteIcon>
            </>
          )}
        </TableCell>
      </TableRow>
    )
  }
}

export default PostTableCell
