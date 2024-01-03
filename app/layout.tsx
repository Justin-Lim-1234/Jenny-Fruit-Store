import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

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
    <body className={`${inter.className} antialiased text-4xl text-center`}>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </body>
  )
}
