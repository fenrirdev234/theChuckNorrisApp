export const API_ENDPOINTS = {
	random: '/jokes/random',
	categories: '/jokes/categories',
	randomCategory: (category?: string) =>
		category ? `/jokes/random?category=${category}` : '/jokes/random',
	search: (query: string) => `/jokes/search?query=${query}`,
}
