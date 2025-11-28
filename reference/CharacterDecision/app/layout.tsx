import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Life Character Assessment - Discover Your Personality Type',
  description: 'Discover your Enneagram personality type through life situations and experiences',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <main className="min-h-screen py-8 px-4">
          {children}
        </main>
      </body>
    </html>
  )
}
