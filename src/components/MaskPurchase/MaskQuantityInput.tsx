import { type Dispatch, type SetStateAction } from 'react'

import { HStack, VStack } from '@kdan-ui'
import { Unstable_Grid2 as Grid, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'

import { type PharmacyMask } from '../../types/pharmacy'

import { QuantityInput } from './QuantityInput'

interface MaskQuantityInputProps {
  maskId: string,
  maskName: PharmacyMask['name'],
  maskPrice: PharmacyMask['price'],
  quantity: number,
  setMasks: Dispatch<SetStateAction<Record<string, { quantity: number }>>>,
}

export function MaskQuantityInput ({ maskId, maskName, maskPrice, quantity, setMasks }: MaskQuantityInputProps) {
  return (
    <Grid xs={12} sm={6} md={4}>
      <VStack gap={1}>
        <Typography fontSize={20} fontWeight={500}>{maskName}</Typography>
        <HStack width="100%" justifyContent="flex-end" gap={2}>
          <Typography fontSize={18}>{`$${maskPrice}`}</Typography>
          <QuantityInput
            value={quantity}
            onIncrement={() => setMasks((masks) => ({ ...masks, [maskId]: { ...masks[maskId], quantity: quantity + 1 } }))}
            onDecrement={() => setMasks((masks) => ({ ...masks, [maskId]: { ...masks[maskId], quantity: quantity - 1 } }))}
            onChange={(value) => setMasks((masks) => ({ ...masks, [maskId]: { ...masks[maskId], quantity: value ?? 0 } }))}
          />
        </HStack>
        <HStack width="100%" justifyContent="flex-end">
          <Typography fontSize={18} color={blue[500]}>{`$${(quantity * maskPrice).toFixed(2)}`}</Typography>
        </HStack>
      </VStack>
    </Grid>
  )
}
