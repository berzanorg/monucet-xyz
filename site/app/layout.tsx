import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Monucet',
  description: 'Monad Testnet Faucet By Berzan',

  metadataBase: new URL('https://monucet.xyz'),
  twitter: {
    card: 'summary_large_image',
    site: '@monucet_xyz',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} antialiased bg-white text-gray-950`}>{children}</body>
    </html>
  )
}
