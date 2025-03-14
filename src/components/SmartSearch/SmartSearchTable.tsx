import { TableContainer, TableRow, TableHead, Table, TableCell, TableBody } from '@mui/material'

import { type SearchResult } from '../../types/search'

interface PharmacyTableProps {
  data?: SearchResult[],
}

export function SmartSearchTable ({ data }: PharmacyTableProps) {
  return (
    <TableContainer sx={{ maxHeight: 550, overflow: 'auto' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>藥局 / 口罩</TableCell>
            <TableCell>價格 / 現金餘額</TableCell>
            <TableCell>類型</TableCell>
            <TableCell>排名</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item, index) => (
            <TableRow key={`${item?.pharmacy_id}-${item?.mask_id}`}>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                {
                  item.type === 'mask'
                    ? Number(item.price).toFixed(2)
                    : Number(item.cash_balance).toFixed(2)
                }
              </TableCell>
              <TableCell>
                {
                  item.type === 'mask'
                    ? '口罩'
                    : '藥局'
                }
              </TableCell>
              <TableCell>{index + 1}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
