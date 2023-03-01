import React, { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import { messageData } from '../utils/utils'
const SnackBar = ({ message, setMessage }) => {
  const [msg, setMsg] = useState({})
  const [openMsg, setOpenMsg] = useState(false)
  useEffect(() => {
    message && setOpenMsg(true)
    message && setMsg(messageData.filter((e) => e.label === message))
    setMessage('')
    //console.log(message)
    //console.log(msg)
  }, [message])
  const handleClose = () => {
    setOpenMsg(false)
  }

  return (
    <>
      {msg.length > 0 && (
        <Stack sx={{ width: '30%' }} spacing={2}>
          <Snackbar
            open={openMsg}
            autoHideDuration={6000}
            onClose={handleClose}>
            <Alert
              variant="filled"
              severity={msg[0].id}
              onClose={() => handleClose()}>
              {msg[0].txt}
            </Alert>
          </Snackbar>
        </Stack>
      )}
    </>
  )
}

export default SnackBar
