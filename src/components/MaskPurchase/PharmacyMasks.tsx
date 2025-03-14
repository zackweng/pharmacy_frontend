import { useState } from 'react'

import { HStack, VStack } from '@kdan-ui'
import { Divider, Unstable_Grid2 as Grid, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'

import { type PharmacyMask } from '../../types/pharmacy'

import { MaskQuantityInput } from './MaskQuantityInput'

interface PharmacyMaskProps {
  pharmacyName: string,
  pharmacyMasks: PharmacyMask[],
}

export function PharmacyMasks ({ pharmacyName, pharmacyMasks }: PharmacyMaskProps) {
  const initialMasks = pharmacyMasks.reduce<Record<string, { quantity: number }>>((acc, mask) => {
    acc[(mask.id).toString()] = {
      quantity: 0,
    }
    return acc
  }, {})

  const [masks, setMasks] = useState(initialMasks)

  const totalPrice = pharmacyMasks.reduce((acc, mask) => {
    return acc + (masks[mask.id].quantity * mask.price)
  }, 0)

  return (
    <VStack gap={2} width="100%">
      <Typography variant="h5">
        {pharmacyName}
      </Typography>
      <Grid container spacing={3} p={2} width="100%">
        {pharmacyMasks.map((mask) => (
          <MaskQuantityInput
            key={mask.id}
            maskId={mask.id.toString()}
            maskName={mask.name}
            maskPrice={mask.price}
            quantity={masks[mask.id].quantity}
            setMasks={setMasks}
          />
        ))}
      </Grid>
      <HStack justifyContent="flex-end" width="100%">
        <Typography fontSize={26} fontWeight={700} color={blue[800]}>{`$${totalPrice.toFixed(2)}`}</Typography>
      </HStack>
      <Divider sx={{ width: '100%' }} />
    </VStack>
  )
}
