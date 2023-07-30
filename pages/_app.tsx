import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"

import { ThemeProvider, CssBaseline } from '@mui/material'
import { DarkTheme } from '@/themes'

import { AuthProvider, GsProvider, UiProvider } from '@/context'

import { SnackbarProvider } from 'notistack'
import { SWRConfig } from 'swr'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <SWRConfig
        value={{
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
      >
        <AuthProvider>
          <GsProvider>
            <UiProvider>
              <SnackbarProvider>
                <ThemeProvider theme={DarkTheme}>
                  <CssBaseline />
                  <Component {...pageProps} />
                </ThemeProvider>
              </SnackbarProvider>
            </UiProvider>
          </GsProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  )
}
