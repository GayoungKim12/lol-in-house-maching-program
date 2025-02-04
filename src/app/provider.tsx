import QueryProvider from '@/app/QueryClientProvider'
import { ReactNode } from 'react'

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      {children}
    </QueryProvider>
  )
}