import { useCallback, useEffect, useState } from 'react'

import { type IUseApiCall } from '../models/useApi.model'

type UseApiOptions<P> = {
	autoFetch?: boolean
	params: P
}

type Data<T> = T | null
type CustomError = Error | null

interface IUseApiCallResult<T> {
	loading: boolean
	data: Data<T>
	error: CustomError
	/* 	fetch: (param: P) => void */
}
export const useApi = <T, P>(
	apiCall: (param: P) => IUseApiCall<T>,
	options?: UseApiOptions<P>,
): IUseApiCallResult<T> => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<CustomError>(null)
	const [data, setData] = useState<Data<T>>(null)

	const fetchData = useCallback(
		(param: P) => {
			const { call, controller } = apiCall(param)
			setLoading(true)
			call
				.then((response) => {
					setData(response.data)
					setError(null)
				})
				.catch((error) => {
					setError(error)
				})
				.finally(() => {
					setLoading(false)
				})
			return () => {
				controller.abort()
			}
		},
		[apiCall],
	)

	useEffect(() => {
		if (options?.autoFetch) {
			fetchData(options.params)
		}
	}, [fetchData, options?.autoFetch, options?.params])

	return {
		loading,
		data,
		error,
	}
}
