import React from 'react'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { zhTW } from 'date-fns/locale'
import ReactDOM from 'react-dom/client'

import { App } from './App'

const target = document.getElementById('root')
if (target == null) throw new Error()

ReactDOM.createRoot(target).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={zhTW}>
      <App />
    </LocalizationProvider>
  </React.StrictMode>
)
