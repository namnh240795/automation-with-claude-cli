import { useState, useEffect, useCallback } from 'react'

export interface DataQueryOptions<T> {
  queryFn: () => Promise<T>
  enabled?: boolean
  refetchInterval?: number
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
}

export interface DataQueryResult<T> {
  data: T | null
  isLoading: boolean
  isError: boolean
  error: Error | null
  refetch: () => void
}

export function useDataQuery<T>({
  queryFn,
  enabled = true,
  refetchInterval,
  onSuccess,
  onError,
}: DataQueryOptions<T>): DataQueryResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    if (!enabled) return

    setIsLoading(true)
    setIsError(false)
    setError(null)

    try {
      const result = await queryFn()
      setData(result)
      onSuccess?.(result)
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error('An error occurred')
      setIsError(true)
      setError(errorObj)
      onError?.(errorObj)
    } finally {
      setIsLoading(false)
    }
  }, [queryFn, enabled, onSuccess, onError])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    if (refetchInterval && enabled) {
      const interval = setInterval(fetchData, refetchInterval)
      return () => clearInterval(interval)
    }
  }, [fetchData, refetchInterval, enabled])

  return {
    data,
    isLoading,
    isError,
    error,
    refetch: fetchData,
  }
}

// Hook for mutations (create, update, delete)
export interface DataMutationOptions<TData, TVariables> {
  mutationFn: (variables: TVariables) => Promise<TData>
  onSuccess?: (data: TData, variables: TVariables) => void
  onError?: (error: Error, variables: TVariables) => void
}

export interface DataMutationResult<TData, TVariables> {
  mutate: (variables: TVariables) => Promise<void>
  data: TData | null
  isLoading: boolean
  isError: boolean
  error: Error | null
  reset: () => void
}

export function useDataMutation<TData = void, TVariables = void>({
  mutationFn,
  onSuccess,
  onError,
}: DataMutationOptions<TData, TVariables>): DataMutationResult<TData, TVariables> {
  const [data, setData] = useState<TData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const mutate = async (variables: TVariables) => {
    setIsLoading(true)
    setIsError(false)
    setError(null)

    try {
      const result = await mutationFn(variables)
      setData(result)
      onSuccess?.(result, variables)
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error('An error occurred')
      setIsError(true)
      setError(errorObj)
      onError?.(errorObj, variables)
      throw errorObj
    } finally {
      setIsLoading(false)
    }
  }

  const reset = () => {
    setData(null)
    setIsError(false)
    setError(null)
  }

  return {
    mutate,
    data,
    isLoading,
    isError,
    error,
    reset,
  }
}
