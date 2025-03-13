import { useState } from 'react'

import { Card } from '@mui/material'
import { format } from 'date-fns'
import { FormProvider, useForm } from 'react-hook-form'

import { DATE_TIME_FORMAT, TIME_FORMAT } from '../../constant/format'
import { type DAY_OF_WEEK as DAY_OF_WEEK_TYPE, DAY_OF_WEEK } from '../../constant/time'
import { useApiPharmacyTime } from '../../hooks-api/useApiPharmacyTime'
import { queryStringify } from '../../utils/queryStringify'

import { PharmacyTimeSearchForm } from './PharmacyTimeSearchForm'

export interface PharmacyTimeSearchSchema {
  dayOfWeek: DAY_OF_WEEK_TYPE,
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

  const { data: pharmacyTime } = useApiPharmacyTime(queryString)

  const onSubmit = (data: PharmacyTimeSearchSchema) => {
    setQueryString(queryStringify({
      day_of_week: data.dayOfWeek,
      time_str: format(new Date(data.timeStr), TIME_FORMAT),
    }))
  }

  // eslint-disable-next-line no-console
  console.log(pharmacyTime)

  return (
    <FormProvider {...methods}>
      <Card>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <PharmacyTimeSearchForm />
        </form>
      </Card>
    </FormProvider>
  )
}
