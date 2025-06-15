import { useState } from 'react'

import { useApiAllPharmacyMasks, useApiUsers } from '@hooks-api'
import { Card, Divider } from '@mui/material'
import { Loading, Select, VStack } from '@pharmacy-ui'

import { PharmacyMasks } from './PharmacyMasks'

export function MaskPurchase () {
  const { data: allPharmacyMaskData } = useApiAllPharmacyMasks()
  const { data: usersData, isLoading } = useApiUsers()

  const [selectedUserId, setSelectedUserId] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const userOptions = usersData?.map((user) => ({
    key: user.id,
    value: user.name,
  }))

  return (
    <Card sx={{ p: 2 }}>
      <VStack gap={3}>
        <Select
          options={userOptions ?? []}
          label="選擇使用者"
          value={selectedUserId}
          sx={{
            '& .MuiSelect-select': {
              width: 150,
            },
          }}
          onChange={(e) => {
            setSelectedUserId(e.target.value as string)
            setErrorMessage('')
          }}
          errorMessage={errorMessage}
          error={!!errorMessage}
        />
        <Divider sx={{ width: '100%' }} />
        {isLoading
          ? <Loading />
          : <Card sx={{ maxHeight: 600, overflow: 'auto' }}>
            <VStack gap={2} p={2}>
              {
                Object.entries(allPharmacyMaskData ?? {}).map(([pharmacyName, pharmacyMasks]) => (
                  <PharmacyMasks
                    key={pharmacyName}
                    pharmacyName={pharmacyName}
                    pharmacyMasks={pharmacyMasks}
                    userId={selectedUserId}
                    setErrorMessage={setErrorMessage}
                  />
                ))
              }
            </VStack>
          </Card>
        }
      </VStack>
    </Card>
  )
}
