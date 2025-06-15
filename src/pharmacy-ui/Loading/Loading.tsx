import { CircularProgress, type CircularProgressProps } from '@mui/material'

import { HStack } from '../HStack/HStack'

interface LoadingProps extends CircularProgressProps {}

export function Loading ({ ...props }: LoadingProps) {
  return (
    <HStack justifyContent="center" alignItems="center" width="100%" mt={2}>
      <CircularProgress {...props} />
    </HStack>
  )
}
