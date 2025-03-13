import Stack, { type StackProps } from '@mui/material/Stack'

export const HStack = (props: StackProps) => {
  return <Stack direction="row" alignItems="center" justifyContent="flex-start" {...props} />
}

export type { StackProps as HStackProps }
