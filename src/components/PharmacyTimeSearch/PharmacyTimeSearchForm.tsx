import { HStack, Select, TimePicker, VStack } from '@kdan-ui'
import { Box, Button } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

import { TIME_FORMAT } from '../../constant/format'
import { DAY_OF_WEEK } from '../../constant/time'

import { type PharmacyTimeSearchSchema } from './PharmacyTimeSearch'

export function PharmacyTimeSearchForm () {
  const { control } = useFormContext<PharmacyTimeSearchSchema>()

  const dayOfWeekOptions = Object.values(DAY_OF_WEEK).map((day) => ({
    key: day,
    value: day,
  }))

  const dateStyle = {
    width: 150,
    '& .MuiInputBase-root': {
      height: '40px',
      width: '100%',
    },
    '& .MuiFormControl-root': {
      width: '100%',
    },
  }

  return (
    <VStack gap={2} p={2}>
      <HStack gap={2}>
        <Controller
          control={control}
          name="dayOfWeek"
          rules={{
            required: '必填欄位',
          }}
          render={({ field, fieldState: { error } }) => (
            <Select
              {...field}
              options={dayOfWeekOptions ?? []}
              label="星期:"
              error={!!error}
              errorMessage={error?.message}
              sx={{
                '& .MuiSelect-select': {
                  width: 120,
                },
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="timeStr"
          render={({ field }) => (
            <TimePicker
              {...field}
              format={TIME_FORMAT}
              label="時間:"
              value={field.value ? new Date(field.value) : new Date()}
              sx={dateStyle}
              ampm={false}
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
