import { useState } from 'react'

import { Tabs } from '@kdan-ui'
import { Box } from '@mui/material'

import { MaskPurchase } from '../components/MaskPurchase/MaskPurchase'
import { MaskQuantityFilter } from '../components/MaskQuantityFilter/MaskQuantityFilter'
import { PharmacyMaskList } from '../components/PharmacyMaskList/PharmacyMaskList'
import { PharmacyTimeSearch } from '../components/PharmacyTimeSearch/PharmacyTimeSearch'
import { SmartSearch } from '../components/SmartSearch/SmartSearch'
import { TransactionStats } from '../components/TransactionStats/TransactionStats'
import { UserTransactionRank } from '../components/UserTransactionRank/UserTransactionRank'

export function Home () {
  const [tab, setTab] = useState(5)

  return (
    <Box p={2}>
      <Tabs
        tab={tab}
        tabList={[
          { label: '藥局營業查詢', component: <PharmacyTimeSearch /> },
          { label: '藥局口罩查詢', component: <PharmacyMaskList /> },
          { label: '口罩數量篩選', component: <MaskQuantityFilter /> },
          { label: '消費排行榜', component: <UserTransactionRank /> },
          { label: '交易統計報表', component: <TransactionStats /> },
          { label: '智慧搜尋', component: <SmartSearch /> },
          { label: '購買口罩', component: <MaskPurchase /> },
        ]}
        onChange={setTab}
      />
    </Box>
  )
}
