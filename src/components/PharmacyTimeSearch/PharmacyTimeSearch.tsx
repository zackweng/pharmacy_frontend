import { useState } from 'react'

import { useApiPharmacyTime } from '@hooks-api'
import { Card, Typography } from '@mui/material'
import { Loading } from '@pharmacy-ui'
import { format } from 'date-fns'
import { FormProvider, useForm } from 'react-hook-form'

import { DATE_TIME_FORMAT, TIME_FORMAT } from '../../constant/format'
import { DAY_OF_WEEK } from '../../constant/time'
import { queryStringify } from '../../utils/queryStringify'
import { PharmacyTable } from '../PharmacyTable/PharmacyTable'

import { PharmacyTimeSearchForm } from './PharmacyTimeSearchForm'

export interface PharmacyTimeSearchSchema {
  dayOfWeek: DAY_OF_WEEK,
  timeStr: string,
}

export function PharmacyTimeSearch () {
  const methods = useForm<PharmacyTimeSearchSchema>({
    defaultValues: {
      dayOfWeek: DAY_OF_WEEK.MON,
      timeStr: format(new Date(), DATE_TIME_FORMAT),
    },
  })

  const [queryString, setQueryString] = useState('')

  const { data: pharmacyTimeData, isLoading } = useApiPharmacyTime(queryString)

  const onSubmit = (data: PharmacyTimeSearchSchema) => {
    setQueryString(queryStringify({
      day_of_week: data.dayOfWeek,
      time_str: format(new Date(data.timeStr), TIME_FORMAT),
    }))
  }

  return (
    <FormProvider {...methods}>
      <Card>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <PharmacyTimeSearchForm />
        </form>
      </Card>
      {
        isLoading
          ? <Loading />
          : pharmacyTimeData && (
            <Card sx={{ mt: 2, p: 2 }}>
              {
              pharmacyTimeData.length > 0
                ? <PharmacyTable data={pharmacyTimeData ?? []} />
                : <Typography>查無資料</Typography>
            }
            </Card>
          )
      }
    </FormProvider>
  )
}
