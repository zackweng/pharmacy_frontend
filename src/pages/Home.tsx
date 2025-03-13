import { useState } from 'react'

import { Tabs } from '@kdan-ui'
import { Box } from '@mui/material'

import { MaskPurchase } from '../components/MaskPurchase/MaskPurchase'
import { MaskSearch } from '../components/MaskSearch/MaskSearch'
import { PharmacySearch } from '../components/PharmacySearch/PharmacySearch'
import { TransactionStats } from '../components/TransactionStats/TransactionStats'

export function Home () {
  const [tab, setTab] = useState(0)

  return (
    <Box p={2}>
      <Tabs
        tab={tab}
        tabList={[
          { label: '藥局查詢', component: <PharmacySearch /> },
          { label: '口罩查詢', component: <MaskSearch /> },
          { label: '交易統計', component: <TransactionStats /> },
          { label: '購買口罩', component: <MaskPurchase /> },
        ]}
        onChange={setTab}
      />
    </Box>
  )
}
