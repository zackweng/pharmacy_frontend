import { TableContainer, TableRow, TableHead, Table, TableCell, TableBody } from '@mui/material'

import { type PharmacyMask } from '../../types/pharmacy'

interface PharmacyMaskListTableProps {
  data?: PharmacyMask[],
}

export function PharmacyMaskListTable ({ data }: PharmacyMaskListTableProps) {
  return (
    <TableContainer sx={{ maxHeight: 550, overflow: 'auto' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>口罩名稱</TableCell>
            <TableCell>口罩價格</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
