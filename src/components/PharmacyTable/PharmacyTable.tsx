import { TableContainer, TableRow, TableHead, Table, TableCell, TableBody } from '@mui/material'

import { type Pharmacy } from '../../types/pharmacy'

interface PharmacyTableProps {
  data?: Pharmacy[],
}

export function PharmacyTable ({ data }: PharmacyTableProps) {
  return (
    <TableContainer sx={{ maxHeight: 550, overflow: 'auto' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>藥局名稱</TableCell>
            <TableCell>現金餘額</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.cash_balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
