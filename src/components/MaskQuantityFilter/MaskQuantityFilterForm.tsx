import { HStack, Select, VStack } from '@kdan-ui'
import { Box, Button, TextField, Typography } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

import { type MaskQuantityFilterSchema } from './MaskQuantityFilter'

export function PharmacyMaskListForm () {
  const { control } = useFormContext<MaskQuantityFilterSchema>()

  const countOpOptions = [
    { key: 'gt', value: '大於' },
    { key: 'lt', value: '小於' },
  ]

  const pharmacyStyle = {
    '& .MuiSelect-select': {
      width: 80,
    },
  }

  const inputStyle = {
    '& .MuiInputBase-root': {
      height: '40px',
      width: 120,
    },
  }

  return (
    <VStack gap={2} p={2}>
      <HStack gap={2}>
        <Controller
          control={control}
          name="countValue"
          rules={{
            required: '必填欄位',
          }}
          render={({ field }) => (
            <VStack gap={1}>
              <Typography>口罩種類數量：</Typography>
              <TextField
                {...field}
                type="number"
                sx={inputStyle}
              />
            </VStack>
          )}
        />
        <Controller
          control={control}
          name="countOp"
          rules={{
            required: '必填欄位',
          }}
          render={({ field, fieldState: { error } }) => (
            <Select
              {...field}
              options={countOpOptions ?? []}
              label="比較:"
              error={!!error}
              errorMessage={error?.message}
              sx={pharmacyStyle}
            />
          )}
        />
        <VStack gap={1}>
          <Typography>口罩價格區間：</Typography>
          <HStack gap={1}>
            <Controller
              control={control}
              name="priceMin"
              rules={{
                required: '必填欄位',
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  sx={inputStyle}
                />
              )}
            />
            <Typography>~</Typography>
            <Controller
              control={control}
              name="priceMax"
              rules={{
                required: '必填欄位',
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  sx={inputStyle}
                />
              )}
            />
          </HStack>
        </VStack>
      </HStack>
      <Box display="flex" justifyContent="flex-end" width="100%">
        <Button variant="contained" color="primary" type="submit">
          搜尋
        </Button>
      </Box>
    </VStack>
  )
}
