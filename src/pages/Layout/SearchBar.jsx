import * as React from 'react'

import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import { TextField } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import { InputAdornment } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import MenuItem from '@mui/material/MenuItem'

import Menu from '@mui/material/Menu'

import { auth } from '../../utils/token'
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

const SearchBar = ({
  products,
  inputValue,
  setInputValue,
  searchedValue,
  setSearchedValue,
  setMessage,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const email = localStorage.getItem('email')
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const logOut = () => {
    localStorage.clear()
    setMessage('logOut')
  }
  const handleClearClick = () => {
    setInputValue('')
    setSearchedValue('')
  }

  const search = (e) => {
    e.preventDefault()
    setSearchedValue(inputValue)
    console.log(inputValue)
    console.log(searchedValue)
  }

  return (
    <Box>
      <AppBar>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}>
            Product Management
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItem: 'center',
              justifyContent: 'space-between',
            }}>
            <Box sx={{ display: 'flex' }}>
              <form onSubmit={search}>
                <Search>
                  <TextField
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Search…"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <IconButton
                          sx={{ visibility: inputValue ? 'visible' : 'hidden' }}
                          onClick={handleClearClick}>
                          <ClearIcon />
                        </IconButton>
                      ),
                    }}
                  />
                </Search>
              </form>
            </Box>
          </Box>
          {auth && (
            <Box
              sx={{
                display: 'flex',
                position: 'absolute',
                right: 20,
              }}>
              <Box>
                <IconButton onClick={handleClick}>
                  <AccountCircleIcon />
                </IconButton>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}>
                <MenuItem>{email}</MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose()
                    logOut()
                  }}>
                  LogOut
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
export default SearchBar
