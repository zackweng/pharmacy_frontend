import { useState } from 'react'

import { useApiPharmacyFilter } from '@hooks-api'
import { type PharmacyFilterParams } from '@hooks-api'
import { Card, Typography } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'

import { PharmacyTable } from '../PharmacyTable/PharmacyTable'

import { PharmacyMaskListForm } from './MaskQuantityFilterForm'

export interface MaskQuantityFilterSchema {
  countOp: 'gt' | 'lt',
  countValue: number,
  priceMin: number,
  priceMax: number,
}

export function MaskQuantityFilter () {
  const methods = useForm<MaskQuantityFilterSchema>({
    defaultValues: {
      countOp: 'gt',
      countValue: 0,
      priceMin: 0,
      priceMax: 0,
    },
  })

  const [queryParams, setQueryParams] = useState<PharmacyFilterParams>({})

  const { data: pharmacyFilterData } = useApiPharmacyFilter(queryParams)

  const onSubmit = (data: MaskQuantityFilterSchema) => {
    setQueryParams(data)
  }
  return (
    <FormProvider {...methods}>
      <Card>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <PharmacyMaskListForm />
        </form>
      </Card>
      {
        pharmacyFilterData && (
          <Card sx={{ mt: 2, p: 2 }}>
            {
              pharmacyFilterData.length > 0
                ? <PharmacyTable data={pharmacyFilterData ?? []} />
                : <Typography>查無資料</Typography>
            }
          </Card>
        )
      }
    </FormProvider>
  )
}
