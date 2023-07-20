import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"

import { ThemeProvider, CssBaseline } from '@mui/material'
import { DarkTheme } from '@/themes'

import { AuthProvider } from '@/context'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <AuthProvider>
        <ThemeProvider theme={DarkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </SessionProvider>
  )
}
