import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'
import { Outlet } from 'react-router-dom'

export function Layout () {
  return (
    <Box
      bgcolor={grey[200]}
      sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', minWidth: '100vw', overflowX: 'scroll' }}
    >
      <Outlet />
    </Box>
  )
}
