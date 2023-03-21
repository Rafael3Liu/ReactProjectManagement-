import * as React from 'react'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import { visuallyHidden } from '@mui/utils'
import AddIcon from '@mui/icons-material/Add'
import AddNEwTableCell from '../../component/AddNewTableCell'
import { axiosInstance } from '../../utils/interceptors'
import PostTableCell from '../../component/PostTableCell'
import ExportExcel from '../../Excel/ExportExcel'
import ImportExcel from '../../Excel/ImportExcel'
import SearchBar from './SearchBar'

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const headCells = [
  {
    id: 'title',
    numeric: false,
    disablePadding: true,
    label: 'Product Name',
  },

  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Price',
  },
  {
    id: 'product_image',
    numeric: true,
    disablePadding: false,
    label: 'Image',
  },
  {
    id: 'description',
    numeric: true,
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
]

function EnhancedTableHead(props) {
  const {
    order,
    orderBy,

    onRequestSort,
  } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={
                headCell.id === 'price' || headCell.id === 'title'
                  ? true
                  : false
              }
              //active={headCell.id === orderBy}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              hideSortIcon>
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
}

const EnhancedTable = ({
  searchedValue,
  setSearchedValue,
  setMessage,
  inputValue,
  setInputValue,
}) => {
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('price')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)

  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [addNew, setAddNew] = useState(false)
  const [products, setProducts] = useState([])
  const [defaultProducts, setDefaultProducts] = useState([])
  const [editNum, setEditNum] = useState('')
  const [productsOpacity, setProductsOpacity] = useState(false)
  const [imgFile, setImgFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const formData = new FormData()

  useEffect(() => {
    const loadList = async () => {
      const res = await axiosInstance.get('products')
      setProducts(res.data)
      setDefaultProducts(res.data)
      setSearchedValue('')
    }
    loadList()
  }, [])
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }
    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)
  }, [selectedFile])
  useEffect(() => {
    setProducts(
      defaultProducts.filter((product) => {
        if (searchedValue === '') {
          return product
        } else if (
          product.title &&
          searchedValue &&
          product.title.toLowerCase().includes(searchedValue.toLowerCase())
        ) {
          return product
        } else if (
          product.description &&
          searchedValue &&
          product.description
            .toLowerCase()
            .includes(searchedValue.toLowerCase())
        ) {
          return product
        }
      })
    )
  }, [searchedValue, defaultProducts])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = products.map((n) => n.name)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (name) => selected.indexOf(name) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0

  const onToggle = (id) => {
    console.log(id)
    setEditNum(id)
  }
  const onCancel = () => {
    setEditNum('')
    setPreview(null)
    setAddNew(false)
  }
  const onDelete = (id) => {
    const newList = products.filter((product) => product.id !== id)
    console.log(id)
    setProducts(newList)

    axiosInstance.delete(`products/${id}`).then((res) => {
      console.log(res.data)
      res.data ? setMessage('delete-success') : setMessage('delete-unsuccess')
    })
  }
  const onAdd = () => {
    setAddNew(!addNew)
  }

  const addData = (data) => {
    const { title, description, price } = data

    formData.append('title', title)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('category_id', 1)
    if (imgFile) {
      formData.append('product_image', imgFile)
    }

    console.log(data)
    console.log(imgFile)
    if (data.id) {
      console.log(data)
      formData.append('_method', 'put')
      axiosInstance.post(`products/${data.id}`, formData).then((res) => {
        console.log(res)
        setEditNum('')
        setImgFile(null)
        res.data ? setMessage('updated') : setMessage('notUpdated')
      })
    } else {
      createNew(formData)
    }
  }

  const createNew = (params) => {
    axiosInstance.post('products', params).then((res) => {
      console.log(res)
      setAddNew(false)
      setImgFile(null)

      res.data ? setMessage('createdNew') : setMessage('notCreatedNew')
    })
  }

  return (
    <Box>
      <SearchBar
        inputValue={inputValue}
        setInputValue={setInputValue}
        searchedValue={searchedValue}
        setSearchedValue={setSearchedValue}
        setMessage={setMessage}
      />

      <Box
        sx={{
          mt: 10,
          maxWidth: { xs: 450, sm: 550, md: 1050, xl: 1450 },
          ml: 'auto',
          mr: 'auto',
          userSelect: 'none',
          fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
          fontWeight: 500,
        }}>
        <Box
          sx={{
            display: 'flex',
            alignItem: 'center',
            justifyContent: 'space-between',
          }}>
          <Box sx={{ display: 'flex' }}>
            <p>ADD NEW</p>
            <IconButton
              onClick={() => {
                onAdd()
                setEditNum('')
              }}>
              <AddIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex' }}>
            <ExportExcel products={products} setMessage={setMessage} />
            <ImportExcel
              products={products}
              setMessage={setMessage}
              setProducts={setProducts}
            />
          </Box>
        </Box>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }}>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={products.length}
              />
              <TableBody>
                {addNew && (
                  <AddNEwTableCell
                    addData={addData}
                    onCancel={onCancel}
                    setImgFile={setImgFile}
                    setPreview={setPreview}
                    preview={preview}
                    setSelectedFile={setSelectedFile}
                  />
                )}

                {stableSort(products, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((product, index) => (
                    <PostTableCell
                      stableSort={stableSort}
                      getComparator={getComparator}
                      order={order}
                      orderBy={orderBy}
                      page={page}
                      rowsPerPage={rowsPerPage}
                      handleClick={handleClick}
                      onAdd={onAdd}
                      onDelete={onDelete}
                      product={product}
                      editNum={editNum}
                      onToggle={onToggle}
                      index={index}
                      key={index}
                      productsOpacity={productsOpacity}
                      onCancel={onCancel}
                      addData={addData}
                      setImgFile={setImgFile}
                      setPreview={setPreview}
                      preview={preview}
                      setSelectedFile={setSelectedFile}
                      imgFile={imgFile}
                      setAddNew={setAddNew}
                    />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Box>
  )
}
export default EnhancedTable
