import Stack, { type StackProps } from '@mui/material/Stack'

export const VStack = (props: StackProps) => {
  return <Stack direction="column" alignItems="flex-start" justifyContent="center" {...props} />
}

export type { StackProps as VStackProps }
