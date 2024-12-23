import axios from 'axios'

import { ICategory, IJoke, IJokeBySearch } from '@/models/chuck.model'
import { IUseApiCall } from '@/models/useApi.model'
import { loadAbort } from '@/utils/loadAbort.utils'

import { API_ENDPOINTS } from './endpoints'

const chuckAxios = axios.create({
	baseURL: 'https://api.chucknorris.io/',
	timeout: 150000000,
	headers: {
		'Content-Type': 'application/json',
	},
})

export const getRandomJoke = (): IUseApiCall<IJoke> => {
	const controller = loadAbort()
	return {
		call: chuckAxios.get(API_ENDPOINTS.random, { signal: controller.signal }),
		controller,
	}
}

export const getCategoryJoke = (): IUseApiCall<string[]> => {
	const controller = loadAbort()
	return {
		call: chuckAxios.get<ICategory>(API_ENDPOINTS.categories, {
			signal: controller.signal,
		}),
		controller,
	}
}
export const getJokeByCategory = (category?: string): IUseApiCall<IJoke> => {
	const controller = loadAbort()
	return {
		call: chuckAxios.get(API_ENDPOINTS.randomCategory(category), {
			signal: controller.signal,
		}),
		controller,
	}
}

export const getJokeBySearch = (query: string): IUseApiCall<IJokeBySearch> => {
	const controller = loadAbort()
	return {
		call: chuckAxios.get<IJokeBySearch>(API_ENDPOINTS.search(query), {
			signal: controller.signal,
		}),
		controller,
	}
}
