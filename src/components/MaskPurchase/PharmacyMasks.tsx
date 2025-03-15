import { type Dispatch, type SetStateAction, useMemo, useState } from 'react'

import { useApiPurchaseMask } from '@hooks-api'
import { HStack, VStack, Snackbar, type SnackbarProps } from '@kdan-ui'
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
  const initialMasks = useMemo(() => {
    return pharmacyMasks.reduce<Record<string, PharmacyMask & { quantity: number }>>((acc, mask) => {
      acc[(mask.id).toString()] = {
        ...mask,
        quantity: 0,
      }
      return acc
    }, {})
  }, [pharmacyMasks])

  const [masks, setMasks] = useState(initialMasks)
  const { trigger: purchaseMask, isMutating } = useApiPurchaseMask(userId)

  const [snackbar, setSnackbar] = useState<SnackbarProps>()

  const totalPrice = useMemo(() => {
    return Object.values(masks).reduce((acc, mask) => {
      return acc + (mask.quantity * mask.price)
    }, 0)
  }, [masks])

  const handleCheckout = async () => {
    if (!userId) {
      setErrorMessage('請選擇使用者')
      return
    }

    const payload = Object.values(masks).map((mask) => {
      return {
        pharmacy_id: (mask.pharmacy_id).toString(),
        mask_id: (mask.id).toString(),
        mask_name: mask.name,
        quantity: mask.quantity,
        transaction_amount: mask.price * mask.quantity,
        transaction_date: new Date().toISOString(),
      }
    }).filter((mask) => mask.quantity > 0)

    try {
      await purchaseMask(payload)
      setSnackbar({
        open: true,
        message: '結帳成功',
        severity: 'success',
        autoHideDuration: 3000,
      })
      setMasks(initialMasks)
    } catch (error) {
      setSnackbar({
        open: true,
        message: '結帳失敗, 請稍後再試',
        severity: 'error',
        autoHideDuration: 3000,
      })
    }
  }

  return (
    <>
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
            {isMutating ? '結帳中...' : '結帳'}
          </Button>
        </HStack>
        <Divider sx={{ width: '100%' }} />
      </VStack>
      {snackbar?.open && <Snackbar {...snackbar} />}
    </>
  )
}
