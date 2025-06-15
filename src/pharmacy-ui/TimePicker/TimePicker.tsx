import { type ForwardedRef, forwardRef, type ReactNode } from 'react'

import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import { Box, FormControl, Tooltip, Typography } from '@mui/material'
import { TimePicker as MuiTimePicker, type TimePickerProps as MuiTimePickerProps } from '@mui/x-date-pickers/TimePicker'

import { TIME_FORMAT } from '../../constant/format'
import { AsteriskRed } from '../AsteriskRed/AsteriskRed'
import { VStack } from '../VStack/VStack'

export type TimePickerProps = MuiTimePickerProps<Date> & {
  /**
   * 標籤文字
   */
  label?: string,
  /**
   * 是否必填
   */
  required?: boolean,
  /**
   * 錯誤訊息
   */
  errorMessage?: ReactNode,
  /**
   * 提示文字
   */
  tooltipText?: string,
  /**
   * 是否全寬
   */
  fullWidth?: boolean,
}

export const TimePicker = forwardRef(function LabeledTimePicker (
  { label, required, errorMessage, tooltipText, fullWidth, ...rest }: TimePickerProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <VStack width={fullWidth ? '100%' : undefined} display="flex" gap={1}>
      {label && (
        <Box>
          <Typography ml={2}>
            {label || <>&nbsp;</>}
            {required && <AsteriskRed />}
            <>&nbsp;</>
            {tooltipText && <Tooltip title={tooltipText}>
              <HelpOutlineOutlinedIcon fontSize="small" />
            </Tooltip>}
          </Typography>
        </Box>
      )}
      <FormControl
        fullWidth
        sx={{
          position: 'relative',
          border: errorMessage ? '1px solid red' : 'none',
          borderRadius: 1.5,
        }}
      >
        <MuiTimePicker
          format={TIME_FORMAT}
          ref={ref}
          desktopModeMediaQuery="@media all"
          sx={{
            '& .MuiInputBase-root': {
              height: '40px',
              width: '100%',
            },
          }}
          {...rest}
        />
        {errorMessage && <Typography mt={1} ml={2} color="red" variant="body2" position="absolute" bottom={-20}>{errorMessage}</Typography>}
      </FormControl>
    </VStack>
  )
})
