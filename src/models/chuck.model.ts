export interface IJoke {
	categories: string[]
	created_at: string
	icon_url: string
	id: string
	updated_at: string
	url: string
	value: string
}

export interface IJokeByCategory {
	categories: string[]
	created_at: string
	icon_url: string
	id: string
	updated_at: string
	url: string
	value: string
}

export type ICategory = string[]

export interface IJokeBySearch {
	total: number
	result: Result[]
}

interface Result {
	categories: string[]
	created_at: string
	icon_url: string
	id: string
	updated_at: string
	url: string
	value: string
}
