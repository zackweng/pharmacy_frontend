import { useState } from 'react'

import { type PharmacyMasksParams, useApiPharmacyMasks } from '@hooks-api'
import { Card, Typography } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'

import { SORT_TYPE } from '../../constant/order'

import { PharmacyMaskListForm } from './PharmacyMaskListForm'
import { PharmacyMaskListTable } from './PharmacyMaskListTable'
export interface PharmacyMaskListSchema {
  pharmacyId: string,
  sortBy: 'name' | 'price',
  sortOrder: SORT_TYPE,
}

export function PharmacyMaskList () {
  const methods = useForm<PharmacyMaskListSchema>({
    defaultValues: {
      pharmacyId: '',
      sortBy: 'name',
      sortOrder: SORT_TYPE.ASC,
    },
  })

  const [queryParams, setQueryParams] = useState<PharmacyMasksParams>({})

  const { data: pharmacyMaskData } = useApiPharmacyMasks(queryParams)

  const onSubmit = (data: PharmacyMaskListSchema) => {
    setQueryParams({
      pharmacyId: data.pharmacyId,
      sortBy: data.sortBy,
      sortOrder: data.sortOrder,
    })
  }

  return (
    <FormProvider {...methods}>
      <Card>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <PharmacyMaskListForm />
        </form>
      </Card>
      {
        pharmacyMaskData && (
          <Card sx={{ mt: 2, p: 2 }}>
            {
              pharmacyMaskData.length > 0
                ? <PharmacyMaskListTable data={pharmacyMaskData ?? []} />
                : <Typography>查無資料</Typography>
            }
          </Card>
        )
      }
    </FormProvider>
  )
}
