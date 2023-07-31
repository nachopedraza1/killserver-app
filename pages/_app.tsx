import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"

import { ThemeProvider, CssBaseline } from '@mui/material'
import { DarkTheme } from '@/themes'

import { AuthProvider, GsProvider, UiProvider } from '@/context'

import { SnackbarProvider } from 'notistack'
import { SWRConfig } from 'swr'

import AOS from 'aos';
import 'aos/dist/aos.css';
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: 'ease-in-out',
      delay: 100,
      once: true,
    });
  }, []);

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
