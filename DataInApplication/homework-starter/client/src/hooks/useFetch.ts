import { useEffect, useReducer, useCallback, useRef } from "react";

export type FetchState<T> = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

type FetchAction<T> =
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS'; payload: T }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'RESET' };

function fetchReducer<T>(state: FetchState<T>, action: FetchAction<T>): FetchState<T> {
  switch (state.status) {
    case 'idle':
      switch (action.type) {
        case 'FETCH_INIT':
          return { status: 'loading' };
        default:
          return state;
      }
    
    case 'loading':
      switch (action.type) {
        case 'FETCH_SUCCESS':
          return { status: 'success', data: action.payload };
        case 'FETCH_ERROR':
          return { status: 'error', error: action.payload };
        default:
          return state;
      }
    
    case 'success':
      switch (action.type) {
        case 'FETCH_INIT':
          return { status: 'loading' };
        case 'RESET':
          return { status: 'idle' };
        default:
          return state;
      }
    
    case 'error':
      switch (action.type) {
        case 'FETCH_INIT':
          return { status: 'loading' };
        case 'RESET':
          return { status: 'idle' };
        default:
          return state;
      }
    
    default:
      return state;
  }
}

interface UseFetchOptions {
  autoFetch?: boolean;
}

export function useFetch<T>(
  fetchFn: () => Promise<{ data?: T; error?: string }>,
  options: UseFetchOptions = { autoFetch: true }
) {
  const [state, dispatch] = useReducer<React.Reducer<FetchState<T>, FetchAction<T>>>(
    fetchReducer,
    { status: 'idle' }
  );

  const fetchFnRef = useRef(fetchFn);
  
  useEffect(() => {
    fetchFnRef.current = fetchFn;
  }, [fetchFn]);

  const executeFetch = useCallback(async () => {
    dispatch({ type: 'FETCH_INIT' });

    const response = await fetchFnRef.current();

    if (response.error) {
      dispatch({ type: 'FETCH_ERROR', payload: response.error });
    } else if (response.data) {
      dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
    }
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  useEffect(() => {
    if (options.autoFetch) {
      executeFetch();
    }
  }, [options.autoFetch, executeFetch]);

  return {
    state,
    refetch: executeFetch,
    reset,
    isLoading: state.status === 'loading',
    isError: state.status === 'error',
    isSuccess: state.status === 'success',
    isIdle: state.status === 'idle',
  };
}
