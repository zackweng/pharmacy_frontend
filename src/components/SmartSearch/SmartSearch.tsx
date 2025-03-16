import { useState } from 'react'

import { type SearchParams, useApiSearch } from '@hooks-api'
import { Loading } from '@kdan-ui'
import { Card, Typography } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'

import { SmartSearchForm } from './SmartSearchForm'
import { SmartSearchTable } from './SmartSearchTable'

export interface SmartSearchSchema {
  q: string,
}

export function SmartSearch () {
  const methods = useForm<SmartSearchSchema>({
    defaultValues: {
      q: '',
    },
  })

  const [queryParams, setQueryParams] = useState<SearchParams>({})

  const { data: searchData, isLoading } = useApiSearch(queryParams)

  const onSubmit = (data: SmartSearchSchema) => {
    setQueryParams(data)
  }

  return (
    <FormProvider {...methods}>
      <Card>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <SmartSearchForm />
        </form>
      </Card>
      {
        isLoading
          ? <Loading />
          : searchData && (
            <Card sx={{ mt: 2, p: 2 }}>
              {
                searchData.length > 0
                  ? <SmartSearchTable data={searchData ?? []} />
                  : <Typography>查無資料</Typography>
            }
            </Card>
          )
      }
    </FormProvider>
  )
}
