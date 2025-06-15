import { forwardRef, type ReactNode, type ForwardedRef } from 'react'

import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import { Box, Typography, Tooltip, MenuItem, Select as MuiSelect, FormControl, OutlinedInput, Checkbox, ListItemText } from '@mui/material'
import { type SelectProps as MuiSelectProps } from '@mui/material/Select'

import { AsteriskRed } from '../AsteriskRed/AsteriskRed'
import { VStack } from '../VStack/VStack'

const OPTIONS_HEIGHT = 240

export type SelectProps = MuiSelectProps & {
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
   * 選項列表
   */
  options?: { key: string | number, value: string }[],
  /**
   * 提示文字
   */
  placeholder?: string,
  /**
   * 自定義選項渲染
   */
  renderOption?: ReactNode,
  /**
   * 值
   */
  value?: string | number | (string | number)[],
}

export const Select = forwardRef(function LabeledSelect (
  { tooltipText, required, label, options, variant, errorMessage, renderOption, fullWidth, value, multiple, ...rest }: SelectProps,
  ref: ForwardedRef<unknown>
) {
  return (
    <VStack width={fullWidth ? '100%' : undefined} display="flex" gap={1}>
      {label && (
        <Box>
          <Typography ml={1}>
            {label || <>&nbsp;</>}
            {required && <AsteriskRed />}
            <>&nbsp;</>
            {tooltipText && <Tooltip title={tooltipText}>
              <HelpOutlineOutlinedIcon fontSize="small" />
            </Tooltip>}
          </Typography>
        </Box>
      )}
      <FormControl fullWidth variant={variant || 'outlined'} sx={{ position: 'relative' }}>
        <MuiSelect
          size="small"
          ref={ref}
          input={<OutlinedInput />}
          value={value}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: OPTIONS_HEIGHT,
              },
            },
          }}
          multiple={multiple}
          {...rest}
        >
          {renderOption ?? options?.map((option) => (
            <MenuItem key={option.key} value={option.key}>
              {multiple
                ? <>
                  <Checkbox
                    checked={Array.isArray(value) && value.includes(option.key)}
                    sx={{
                      '&.MuiCheckbox-root': {
                        padding: 1,
                      },
                    }}
                  />
                  <ListItemText primary={option.value} />
                </>
                : option.value}
            </MenuItem>
          ))}
        </MuiSelect>
        {errorMessage && <Typography ml={1} color="red" variant="body2" position="absolute" bottom={-20}>{errorMessage}</Typography>}
      </FormControl>
    </VStack>
  )
})
