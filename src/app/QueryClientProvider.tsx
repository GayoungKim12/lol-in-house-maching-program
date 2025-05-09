'use client'

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { useToast } from '@/shared/hooks/use-toast'

export default function QueryProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast()

  const handleError = (error: Error) => {
    const [title, description] = error.message.split('|')

    toast({
      variant: 'destructive',
      title: title || '오류',
      description: description || '알 수 없는 에러가 발생했습니다.',
    })
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 10,
        retry: 1,
      },
    },
    queryCache: new QueryCache({
      onError: handleError,
    }),
    mutationCache: new MutationCache({
      onError: handleError,
    }),
  })

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}