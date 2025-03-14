import { useApiAllPharmacyMasks } from '@hooks-api'
import { VStack } from '@kdan-ui'
import { Card } from '@mui/material'

import { PharmacyMasks } from './PharmacyMasks'

export function MaskPurchase () {
  const { data: allPharmacyMaskData } = useApiAllPharmacyMasks()

  return (
    <Card sx={{ p: 2 }}>
      <VStack gap={2} maxHeight={700} overflow="auto">
        {
          Object.entries(allPharmacyMaskData ?? {}).map(([pharmacyName, pharmacyMasks]) => (
            <PharmacyMasks key={pharmacyName} pharmacyName={pharmacyName} pharmacyMasks={pharmacyMasks} />
          ))
        }
      </VStack>
    </Card>
  )
}
