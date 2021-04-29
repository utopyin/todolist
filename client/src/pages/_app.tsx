import React from 'react';
import { AppProps }  from 'next/app';
import Router from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query'
import '../styles/globals.css';
import '../styles/nprogress/nprogress.css';
import Head from 'next/head';
import NProgress from 'nprogress';

export default function App({ Component, pageProps }: AppProps) {

  Router.events.on('routeChangeStart', () => NProgress.start());
  Router.events.on('routeChangeComplete', () => NProgress.done());
  Router.events.on('routeChangeError', () => NProgress.done());

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <link rel="icon" href="/favicon-dark.svg" media="(prefers-color-scheme:light)" />
        <link rel="icon" href="/favicon-light.svg" media="(prefers-color-scheme:dark)" />
      </Head>
      <Component {...pageProps}/>
    </QueryClientProvider>
  )
}
