import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JWT Ticket Verifier',
  description: 'Generate tickets using hs512 jwt and scan on event start. Made with ❤️ by Code a Man',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/qr-logo.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} dark text-foreground bg-background`}>{children}</body>
    </html>
  )
}
