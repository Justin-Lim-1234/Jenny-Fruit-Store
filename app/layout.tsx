import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'

const dotenv = require('dotenv');
dotenv.config();

console.log()

const roboto = Roboto({ weight: '300', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jenny\'s Fruit Store ',
  description: 'POS for Jenny\'s Fruit Store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        {/* <link rel="icon" href="favicon.ico" /> */}
      </head>
      <body className={`${roboto.className} antialiased text-4xl text-center`}>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
      </body>
    </html>
  )
}
