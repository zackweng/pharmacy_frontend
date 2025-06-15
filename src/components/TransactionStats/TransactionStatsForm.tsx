import { Box, Button } from '@mui/material'
import { DatePicker, HStack, VStack } from '@pharmacy-ui'
import { format } from 'date-fns'
import { Controller, useFormContext } from 'react-hook-form'

import { DATE_FORMAT } from '../../constant/format'

import { type TransactionStatsSchema } from './TransactionStats'

export function TransactionStatsForm () {
  const { control, setValue, watch } = useFormContext<TransactionStatsSchema>()

  const formValues = watch()

  const dateStyle = {
    width: 180,
    '& .MuiInputBase-root': {
      height: '40px',
      width: '100%',
    },
    '& .MuiFormControl-root': {
      width: '100%',
    },
  }

  const handleDateChange = (date: Date | null, fieldName: 'startDate' | 'endDate') => {
    if (date) {
      const formattedDate = format(date, DATE_FORMAT)
      setValue(fieldName, formattedDate)
    }
  }

  return (
    <VStack gap={2} p={2}>
      <HStack gap={2}>
        <Controller
          control={control}
          name="startDate"
          render={({ field }) => (
            <DatePicker
              {...field}
              format={DATE_FORMAT}
              label="開始時間:"
              value={field.value ? new Date(field.value) : new Date()}
              sx={dateStyle}
              onChange={(date) => {
                handleDateChange(date, 'startDate')
                if (!date || new Date(date) < new Date(formValues.endDate)) return
                handleDateChange(date, 'endDate')
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="endDate"
          render={({ field }) => (
            <DatePicker
              {...field}
              format={DATE_FORMAT}
              label="結束時間:"
              value={field.value ? new Date(field.value) : new Date()}
              sx={dateStyle}
              minDate={new Date(formValues.startDate)}
              onChange={(date) => {
                handleDateChange(date, 'endDate')
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
