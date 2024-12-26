import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { IJoke } from '@/models/chuck.model'

type IFavoriteStore = {
	favorite: IJoke[]
	addFavorite: (joke: IJoke) => void
	removeFavorite: (id: string) => void
}

export const useFavoriteStore = create(
	persist<IFavoriteStore>(
		(set, get) => ({
			favorite: [],
			addFavorite: (data: IJoke) => {
				if (!get().favorite.find((item: IJoke) => item.id === data.id)) {
					set((state) => ({
						favorite: [data, ...state.favorite],
					}))
				}
			},
			removeFavorite: (id: string) => {
				set((state) => ({
					favorite: state.favorite.filter((item: IJoke) => item.id !== id),
				}))
			},
		}),
		{
			name: 'favorite-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
)
