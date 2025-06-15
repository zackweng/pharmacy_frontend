import { Box, Button, TextField, Typography } from '@mui/material'
import { VStack } from '@pharmacy-ui'
import { Controller, useFormContext } from 'react-hook-form'

import { type SmartSearchSchema } from './SmartSearch'

export function SmartSearchForm () {
  const { control } = useFormContext<SmartSearchSchema>()

  return (
    <VStack gap={2} p={2}>
      <Controller
        control={control}
        name="q"
        rules={{
          required: '必填欄位',
        }}
        render={({ field, fieldState: { error } }) => (
          <VStack gap={1} position="relative">
            <Typography ml={1}>關鍵字：</Typography>
            <TextField
              {...field}
              sx={{
                '& .MuiInputBase-root': {
                  height: '40px',
                  width: 180,
                },
                '& .MuiOutlinedInput-root': {
                  // Apply red border when helperText or error is present
                  '& fieldset': {
                    borderColor: error ? 'red' : '',
                  },
                },
              }}
              placeholder="請輸入關鍵字"
            />
            {error && <Typography ml={1} color="red" variant="body2" position="absolute" bottom={-20}>{error.message}</Typography>}
          </VStack>
        )}
      />
      <Box display="flex" justifyContent="flex-end" width="100%">
        <Button variant="contained" color="primary" type="submit">
          搜尋
        </Button>
      </Box>
    </VStack>
  )
}
