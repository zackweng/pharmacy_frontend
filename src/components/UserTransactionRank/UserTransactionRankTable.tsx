import { TableContainer, TableRow, TableHead, Table, TableCell, TableBody } from '@mui/material'

import { type User } from '../../types/user'

interface PharmacyTableProps {
  data?: User[],
}

export function UserTransactionRankTable ({ data }: PharmacyTableProps) {
  return (
    <TableContainer sx={{ maxHeight: 550, overflow: 'auto' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>使用者名稱</TableCell>
            <TableCell>總消費金額</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.user_id}>
              <TableCell>{item.user_name}</TableCell>
              <TableCell>{Number(item.total_spent).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
