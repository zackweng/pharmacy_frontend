import { useState } from 'react'

import { useApiUserTopSpenders, type UserTopSpendersParams } from '@hooks-api'
import { Card, Typography } from '@mui/material'
import { Loading } from '@pharmacy-ui'
import { format } from 'date-fns'
import { FormProvider, useForm } from 'react-hook-form'

import { DATE_FORMAT } from '../../constant/format'

import { UserTransactionRankForm } from './UserTransactionRankForm'
import { UserTransactionRankTable } from './UserTransactionRankTable'

export interface UserTransactionRankSchema {
  startDate: string,
  endDate: string,
  topX: number,
}

export function UserTransactionRank () {
  const methods = useForm<UserTransactionRankSchema>({
    defaultValues: {
      startDate: format(new Date(), DATE_FORMAT),
      endDate: format(new Date(), DATE_FORMAT),
      topX: 10,
    },
  })

  const [queryParams, setQueryParams] = useState<UserTopSpendersParams>({})

  const { data: userTopSpendersData, isLoading } = useApiUserTopSpenders(queryParams)

  const onSubmit = (data: UserTransactionRankSchema) => {
    setQueryParams(data)
  }

  return (
    <FormProvider {...methods}>
      <Card>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <UserTransactionRankForm />
        </form>
      </Card>
      {
        isLoading
          ? <Loading />
          : userTopSpendersData && (
            <Card sx={{ mt: 2, p: 2 }}>
              {
                userTopSpendersData.length > 0
                  ? <UserTransactionRankTable data={userTopSpendersData ?? []} />
                  : <Typography>查無資料</Typography>
            }
            </Card>
          )
      }
    </FormProvider>
  )
}
