import type { Metadata } from 'next'
import './globals.css'
import { RoleProvider } from '@/context/RoleContext';
export const metadata: Metadata = {
  title: 'ArchSpace — Nigeria\'s Design Marketplace',
  description: 'Buy and sell architectural and interior design plans from top Nigerian designers.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <RoleProvider>
          {children}
        </RoleProvider>
      </body>
    </html>
  )
}