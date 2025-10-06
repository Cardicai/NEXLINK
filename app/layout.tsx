
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nex Link – Cosmic Gold',
  description: 'Telegram-style trading hub UI with a premium royal blue + gold palette.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
