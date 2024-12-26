import { StaticScreenProps } from '@react-navigation/native'
import { View } from 'react-native'

import CardJoke from '@/components/card/CardJoke'
import BasicLayout from '@/components/layout/BasicLayout'
import Title from '@/components/text/Title'
import { useApi } from '@/hooks/useApi'
import { IJoke } from '@/models/chuck.model'
import { getJokeByCategory } from '@/services/axios.services'
import { useFavoriteStore } from '@/store/FavoriteStore'
type Props = StaticScreenProps<{
	category: string
}>

export default function JokeScreen({ route }: Props) {
	const { category } = route.params

	const { loading, error, data } = useApi(getJokeByCategory, {
		autoFetch: true,
		params: category ? category : '',
	})
	const { addFavorite } = useFavoriteStore()

	const handleSave = async (data: IJoke | null) => {
		if (data) {
			addFavorite(data)
		}
	}

	return (
		<BasicLayout isList={true}>
			<View style={{ flex: 1, paddingTop: 10 }}>
				<Title>Facts</Title>
				<View>
					<CardJoke
						joke={data?.value}
						type={'save'}
						category={data?.categories}
						onPress={() => {
							handleSave(data)
						}}
					/>
				</View>
			</View>
		</BasicLayout>
	)
}
