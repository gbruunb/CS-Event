import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Kanit } from 'next/font/google'

import Layout from "@/components/Layout";

const kanit = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <main className={kanit.className}>
        <Layout>
          <Component {...pageProps}/>
        </Layout>
      </main>
    </SessionProvider>
  )
}
