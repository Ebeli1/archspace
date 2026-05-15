import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ArchSpace — Nigeria\'s Design Marketplace',
  description: 'Buy and sell architectural and interior design plans, 3D renders, and floor plans from top Nigerian designers.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
