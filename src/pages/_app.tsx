import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/components/header/header'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
   return (
      <>
         <Head>
            <title>rapid-voter</title>
         </Head>
         <Header />
         <Component {...pageProps} />
      </>
   )
}
