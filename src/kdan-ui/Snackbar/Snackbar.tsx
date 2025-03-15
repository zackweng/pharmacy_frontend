import { useState } from 'react'

import { Snackbar as MuiSnackbar, type SnackbarCloseReason, type SnackbarProps as MuiSnackbarProps } from '@mui/material'
import Alert, { type AlertProps } from '@mui/material/Alert'
import Button from '@mui/material/Button'

export interface SnackbarProps {
  open: boolean,
  message: string,
  severity: AlertProps['severity'],
  autoHideDuration?: MuiSnackbarProps['autoHideDuration'],
}

export function Snackbar ({ open: initialOpen = false, message = '', severity = 'success', autoHideDuration = 300 }: SnackbarProps) {
  const [open, setOpen] = useState(initialOpen)

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (
    _?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  return (
    <div>
      <Button onClick={handleClick}>Open Snackbar</Button>
      <MuiSnackbar open={open} autoHideDuration={autoHideDuration} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </MuiSnackbar>
    </div>
  )
}
