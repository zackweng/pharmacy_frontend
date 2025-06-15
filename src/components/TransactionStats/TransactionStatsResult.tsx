import { Typography } from '@mui/material'
import { HStack, VStack } from '@pharmacy-ui'

import { type TransactionSummary } from '../../types/user'

interface TransactionStatsResultProps {
  data: TransactionSummary,
}

export function TransactionStatsResult ({ data }: TransactionStatsResultProps) {
  return (
    <VStack>
      <HStack>
        <Typography variant="h6">
          總口罩數：
        </Typography>
        <Typography variant="h6">
          {data.total_masks}
        </Typography>
      </HStack>
      <HStack>
        <Typography variant="h6">
          總金額：
        </Typography>
        <Typography variant="h6">
          {Number(data.total_dollar).toFixed(2)}
        </Typography>
      </HStack>
    </VStack>
  )
}
