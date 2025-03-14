import { type Dispatch, type SetStateAction, useState } from 'react'

import { HStack, VStack } from '@kdan-ui'
import { Button, Divider, Unstable_Grid2 as Grid, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'

import { type PharmacyMask } from '../../types/pharmacy'

import { MaskQuantityInput } from './MaskQuantityInput'

interface PharmacyMaskProps {
  pharmacyName: string,
  pharmacyMasks: PharmacyMask[],
  userId: string,
  setErrorMessage: Dispatch<SetStateAction<string>>,
}

export function PharmacyMasks ({ pharmacyName, pharmacyMasks, userId, setErrorMessage }: PharmacyMaskProps) {
  const initialMasks = pharmacyMasks.reduce<Record<string, PharmacyMask & { quantity: number }>>((acc, mask) => {
    acc[(mask.id).toString()] = {
      ...mask,
      quantity: 0,
    }
    return acc
  }, {})

  const [masks, setMasks] = useState(initialMasks)

  const totalPrice = pharmacyMasks.reduce((acc, mask) => {
    return acc + (masks[mask.id].quantity * mask.price)
  }, 0)

  const handleCheckout = () => {
    if (!userId) {
      setErrorMessage('請選擇使用者')
      return
    }

    const payload = Object.values(masks).map((mask) => {
      return {
        pharmacy_id: mask.pharmacy_id,
        mask_id: mask.id,
        mask_name: mask.name,
        quantity: mask.quantity,
        transaction_amount: mask.price * mask.quantity,
        transaction_date: new Date().toISOString(),
      }
    }).filter((mask) => mask.quantity > 0)
  }

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
      <HStack justifyContent="flex-end" width="100%" gap={2}>
        <Typography fontSize={26} fontWeight={700} color={blue[800]}>{`$${totalPrice.toFixed(2)}`}</Typography>
        <Button
          disabled={totalPrice === 0}
          variant="contained"
          color="primary"
          onClick={handleCheckout}
        >
          結帳
        </Button>
      </HStack>
      <Divider sx={{ width: '100%' }} />
    </VStack>
  )
}
