import { useState } from 'react'

import { useApiTransactionSummary, type UserTopSpendersParams } from '@hooks-api'
import { Card, Typography } from '@mui/material'
import { format } from 'date-fns'
import { FormProvider, useForm } from 'react-hook-form'

import { DATE_FORMAT } from '../../constant/format'

import { TransactionStatsForm } from './TransactionStatsForm'
import { TransactionStatsResult } from './TransactionStatsResult'

export interface TransactionStatsSchema {
  startDate: string,
  endDate: string,
}

export function TransactionStats () {
  const methods = useForm<TransactionStatsSchema>({
    defaultValues: {
      startDate: format(new Date(), DATE_FORMAT),
      endDate: format(new Date(), DATE_FORMAT),
    },
  })

  const [queryParams, setQueryParams] = useState<UserTopSpendersParams>({})

  const { data: transactionSummaryData } = useApiTransactionSummary(queryParams)

  const onSubmit = (data: TransactionStatsSchema) => {
    setQueryParams(data)
  }

  return (
    <FormProvider {...methods}>
      <Card>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <TransactionStatsForm />
        </form>
      </Card>
      {
        transactionSummaryData && (
          <Card sx={{ mt: 2, p: 2 }}>
            {
              Object.keys(transactionSummaryData).length > 0
                ? <TransactionStatsResult data={transactionSummaryData} />
                : <Typography>查無資料</Typography>
            }
          </Card>
        )
      }
    </FormProvider>
  )
}
