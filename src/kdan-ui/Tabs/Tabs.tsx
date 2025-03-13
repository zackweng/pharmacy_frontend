import { type ReactNode } from 'react'

import { Card, Tab, Tabs as MuiTabs } from '@mui/material'

import { TabPanel } from '../TabPanel/TabPanel'

interface TabsProps {
  tab: number,
  tabList: {
    label: string,
    component: ReactNode,
    enable?: boolean,
  }[],
  onChange: (newValue: number) => void,
}

export function Tabs ({ tab, tabList, onChange }: TabsProps) {
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    onChange?.(newValue)
  }

  return (
    <>
      <Card sx={{ borderBottom: 2, borderColor: 'divider', borderRadius: 0 }}>
        <MuiTabs
          value={tab}
          onChange={handleChange}
          variant="scrollable"
          allowScrollButtonsMobile
        >
          {tabList.map(({ label, enable = true }) => (
            enable && <Tab key={label} label={label} sx={{ minWidth: 200 }} />
          ))}
        </MuiTabs>
      </Card>
      {tabList.map(({ label, component, enable = true }, index) => (
        enable && (
          <TabPanel key={label} value={tab} index={index}>
            {component}
          </TabPanel>
        )
      ))}
    </>
  )
}
