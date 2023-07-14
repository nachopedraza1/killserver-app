import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider, CssBaseline } from '@mui/material'

import { DarkTheme } from '@/themes'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={DarkTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
