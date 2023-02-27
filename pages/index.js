import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Claimabl3</title>
        <meta name="description" content="Geo-locked NFTs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mt-8">
        <h1
          className='text-center text-4xl'
        >Claimabl3</h1>
      </main>
    </>
  )
}
