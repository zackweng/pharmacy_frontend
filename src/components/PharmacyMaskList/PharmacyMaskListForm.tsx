import { useApiPharmacy } from '@hooks-api'
import { Box, Button } from '@mui/material'
import { HStack, Select, VStack } from '@pharmacy-ui'
import { Controller, useFormContext } from 'react-hook-form'

import { type PharmacyMaskListSchema } from './PharmacyMaskList'

export function PharmacyMaskListForm () {
  const { control } = useFormContext<PharmacyMaskListSchema>()

  const { data: pharmacyData } = useApiPharmacy()

  const pharmacyOptions = pharmacyData?.map((pharmacy) => ({
    key: pharmacy.id,
    value: pharmacy.name,
  }))

  const sortByOptions = [
    { key: 'name', value: '名稱' },
    { key: 'price', value: '價格' },
  ]

  const sortOrderOptions = [
    { key: 'asc', value: '升序' },
    { key: 'desc', value: '降序' },
  ]

  const pharmacyStyle = {
    '& .MuiSelect-select': {
      width: 180,
    },
  }

  return (
    <VStack gap={2} p={2}>
      <HStack gap={2}>
        <Controller
          control={control}
          name="pharmacyId"
          rules={{
            required: '必填欄位',
          }}
          render={({ field, fieldState: { error } }) => (
            <Select
              {...field}
              options={pharmacyOptions ?? []}
              label="藥局:"
              error={!!error}
              errorMessage={error?.message}
              sx={pharmacyStyle}
            />
          )}
        />
        <Controller
          control={control}
          name="sortBy"
          rules={{
            required: '必填欄位',
          }}
          render={({ field, fieldState: { error } }) => (
            <Select
              {...field}
              options={sortByOptions ?? []}
              label="排序欄位:"
              error={!!error}
              errorMessage={error?.message}
              sx={pharmacyStyle}
            />
          )}
        />
        <Controller
          control={control}
          name="sortOrder"
          rules={{
            required: '必填欄位',
          }}
          render={({ field, fieldState: { error } }) => (
            <Select
              {...field}
              options={sortOrderOptions ?? []}
              label="排序:"
              error={!!error}
              errorMessage={error?.message}
              sx={pharmacyStyle}
              renderValue={(value) => {
                const selectedOption = sortOrderOptions?.find((option) => option.key === value)
                return selectedOption?.value ?? ''
              }}
            />
          )}
        />
      </HStack>
      <Box display="flex" justifyContent="flex-end" width="100%">
        <Button variant="contained" color="primary" type="submit">
          搜尋
        </Button>
      </Box>
    </VStack>
  )
}
