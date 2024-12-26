import { FlatList, Text, View } from 'react-native'

import CardJoke from '@/components/card/CardJoke'
import Title from '@/components/text/Title'
import { commonColor } from '@/constants/Colors'
import { useFavoriteStore } from '@/store/FavoriteStore'

import BasicLayout from '../components/layout/BasicLayout'

export default function FavoriteScreen() {
	const { favorite, removeFavorite } = useFavoriteStore()

	const deleteJokeFromStorage = async (id: string) => {
		removeFavorite(id)
	}

	return (
		<BasicLayout>
			<View style={{ flex: 1, paddingTop: 10 }}>
				<Title>Favorite</Title>
				<View>
					{favorite.length > 0 ? (
						<FlatList
							style={{ marginBottom: 150 }}
							contentContainerStyle={{ gap: 12 }}
							data={favorite}
							renderItem={({ item }) => (
								<CardJoke
									joke={item.value}
									type='delete'
									onPress={() => deleteJokeFromStorage(item.id)}
								/>
							)}
							keyExtractor={({ id }) => id}
						/>
					) : (
						<Text style={{ color: commonColor.textDetail, fontSize: 20 }}>
							You don't have any favorite jokes
						</Text>
					)}
					<Text />
				</View>
			</View>
		</BasicLayout>
	)
}
