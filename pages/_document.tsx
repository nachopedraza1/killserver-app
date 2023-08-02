import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en" style={{ scrollBehavior: 'smooth' }}>

      <Head>
        <link rel="icon" type="png" sizes="32x32" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600&family=Roboto&display=swap" rel="stylesheet" />
      </Head>

      <body>
        <Main />
        <NextScript />
        <script src="https://cdn.sellix.io/static/js/embed.js" async />
      </body>

    </Html>
  )
}
