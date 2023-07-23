import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"

import { ThemeProvider, CssBaseline } from '@mui/material'
import { DarkTheme } from '@/themes'

import { AuthProvider, UiProvider } from '@/context'

import { SnackbarProvider } from 'notistack'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <AuthProvider>
        <UiProvider>
          <SnackbarProvider>
            <ThemeProvider theme={DarkTheme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </SnackbarProvider>
        </UiProvider>
      </AuthProvider>
    </SessionProvider>
  )
}
