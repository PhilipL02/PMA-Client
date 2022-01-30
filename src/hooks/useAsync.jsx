import { useCallback, useEffect, useState } from "react"

export const STATUS = {
    IDLE: 'IDLE',
    PENDING: 'PENDING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
}

export const validateStatus = value => !!STATUS[value]

const initialState = {
    data: undefined,
    error: undefined,
    status: STATUS.IDLE
}

const resolveState = state => 
    state.status === 'IDLE' ? { ...state, isLoading: false, isError: false, isSuccess: false }
    : state.status === 'PENDING' ? { ...state, isLoading: true, isError: false, isSuccess: false }
    : state.status === 'SUCCESS' ? { ...state, isLoading: false, isError: false, isSuccess: true }
    : state.status === 'ERROR' ? { ...state, isLoading: false, isError: true, isSuccess: false }
    : state

const useAsync = (fn, immidiate) => {
    const [ state, setState ] = useState(resolveState(initialState))

    const execute = useCallback(async (...params) => {
        try {
            setState(resolveState({ ...initialState, status: STATUS.PENDING }))
            
            const res = await fn(...params)
            setState(v => resolveState({ ...v, status: STATUS.SUCCESS, data: res }))
            return res
        } catch (error) {
            setState(v => resolveState({ ...v, status: STATUS.ERROR, error }))
            return error
        }
    }, [])

    useEffect(() => {
        immidiate && execute()
    }, [])

    return { execute, ...state }
}

export default useAsync
