import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import {
	Controller,
	FieldErrors,
	SubmitHandler,
	useForm,
} from 'react-hook-form'
import {
	FlatList,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import Toast from 'react-native-toast-message'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'

import CardJoke from '@/components/card/CardJoke'
import BasicLayout from '@/components/layout/BasicLayout'
import Title from '@/components/text/Title'
import { Colors, commonColor } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { IJoke, IJokeBySearch, Result } from '@/models/chuck.model'
import { ISearchValue, searchSchema } from '@/models/search.model'
import { chuckAxios } from '@/services/axios.services'
import { API_ENDPOINTS } from '@/services/endpoints'
import { useFavoriteStore } from '@/store/FavoriteStore'

export default function SearchScreen() {
	const [searchData, setSearchData] = useState<Result[]>([])
	const colorScheme = useColorScheme()

	const { addFavorite } = useFavoriteStore()

	const handleSave = async (data: IJoke | null) => {
		if (data) {
			addFavorite(data)
		}
	}

	const { control, handleSubmit } = useForm<ISearchValue>({
		resolver: zodResolver(searchSchema),
		defaultValues: {
			search: '',
		},
		mode: 'onSubmit',
	})

	const onHandleSearch: SubmitHandler<ISearchValue> = async ({ search }) => {
		try {
			const data = await chuckAxios.get<IJokeBySearch>(
				API_ENDPOINTS.search(encodeURIComponent(search)),
			)

			if (data.data.total <= 100) {
				setSearchData(data.data.result)
			} else {
				Toast.show({
					type: 'info',
					text1: "It's Over 100!!!!",
					text2:
						'More than 100 results were returned. Please try refining your search.',
				})
			}
		} catch (err) {
			console.log(err)
		}
	}

	const onError = (error: FieldErrors<ISearchValue>) => {
		if (error.search) {
			Toast.show({
				type: 'error',
				text1: `Error search: ${error.search.type}`,
				text2: error.search.message,
			})
		}
	}
	return (
		<BasicLayout>
			<View style={{ flex: 1, paddingTop: 10 }}>
				<Title>Search</Title>
				<View>
					<View style={{ flexDirection: 'row', width: '100%', gap: 20 }}>
						<Controller
							name={'search'}
							control={control}
							rules={{
								maxLength: 100,
							}}
							render={({ field: { onChange, value } }) => (
								<TextInput
									value={value}
									onChangeText={onChange}
									style={[
										styles.input,
										{ backgroundColor: Colors[colorScheme ?? 'light'].bgColor2 },
									]}
								/>
							)}
						/>
						<TouchableOpacity
							style={[styles.button, { backgroundColor: commonColor.buttonbg }]}
							onPress={handleSubmit(onHandleSearch, onError)}
						>
							<AntDesignIcons name={'search1'} size={20} color={'white'} />
						</TouchableOpacity>
					</View>
					{searchData.length > 0 && (
						<FlatList
							style={{ marginTop: 16, marginBottom: 210 }}
							contentContainerStyle={{ gap: 12 }}
							data={searchData}
							renderItem={({ item }) => (
								<CardJoke
									joke={item.value}
									type='save'
									onPress={() => handleSave(item)}
								/>
							)}
							keyExtractor={({ id }) => id}
						/>
					)}
				</View>
			</View>
		</BasicLayout>
	)
}

const styles = StyleSheet.create({
	input: {
		height: 48,
		flexGrow: 1,
		fontSize: 16,
		borderRadius: 10,
		padding: 12,
	},
	button: {
		height: 48,
		width: 48,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
})
