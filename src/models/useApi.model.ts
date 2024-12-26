import { AxiosResponse } from 'axios'

export interface IUseApiCall<T> {
	call: Promise<AxiosResponse<T>>
	controller: AbortController
}
