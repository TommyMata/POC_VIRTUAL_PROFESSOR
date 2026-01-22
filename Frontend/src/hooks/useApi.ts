import { useState, useCallback } from 'react'
import type { ApiResponse, ApiError } from '@/types/api.types'

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: ApiError | null
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: () => Promise<void>
  reset: () => void
}

export function useApi<T>(apiFunction: () => Promise<ApiResponse<T>>): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    try {
      const response = await apiFunction()
      setState({ data: response.data, loading: false, error: null })
    } catch (err) {
      const error: ApiError = {
        message: err instanceof Error ? err.message : 'An unknown error occurred',
      }
      setState({ data: null, loading: false, error })
    }
  }, [apiFunction])

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null })
  }, [])

  return {
    ...state,
    execute,
    reset,
  }
}

interface UseLazyApiReturn<T, P extends unknown[]> extends UseApiState<T> {
  execute: (...params: P) => Promise<void>
  reset: () => void
}

export function useLazyApi<T, P extends unknown[]>(
  apiFunction: (...params: P) => Promise<ApiResponse<T>>
): UseLazyApiReturn<T, P> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const execute = useCallback(
    async (...params: P) => {
      setState((prev) => ({ ...prev, loading: true, error: null }))
      try {
        const response = await apiFunction(...params)
        setState({ data: response.data, loading: false, error: null })
      } catch (err) {
        const error: ApiError = {
          message: err instanceof Error ? err.message : 'An unknown error occurred',
        }
        setState({ data: null, loading: false, error })
      }
    },
    [apiFunction]
  )

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null })
  }, [])

  return {
    ...state,
    execute,
    reset,
  }
}
