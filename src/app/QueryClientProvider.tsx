'use client'

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

export default function QueryProvider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 10,
      },
    },
    queryCache: new QueryCache({
      onError: (error: Error) => handleError('쿼리 (select)', error),
    }),
    mutationCache: new MutationCache({
      onError: (error: Error) => handleError('뮤테이션 (insert, update, upsert, delete)', error),
    }),
  })

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

const handleError = (errorType: string, error: unknown) => {
  console.error(`===== Tanstack ${errorType} 에러 =====`, '\n', '에러내용: ', '\n', error)

  // Handle nested error objects
  const errorObj = typeof error === 'object' && error !== null && 'error' in error
    ? (error as { error: unknown }).error
    : error

  if (isCustomError(errorObj)) {
    // Extract message from nested error object if necessary
    const message = typeof errorObj === 'object' && errorObj !== null
      ? (errorObj as { message: string }).message
      : '에러가 발생하였습니다.'
    alert(message)
  } else {
    console.log('Unhandled error type:', errorObj)
    alert('알 수 없는 에러가 발생하였습니다2.')
  }
}

const isCustomError = (error: unknown): error is { code?: string; message: string } =>
  typeof error === 'object' &&
  error !== null &&
  'message' in error &&
  typeof (error as { message: unknown }).message === 'string'