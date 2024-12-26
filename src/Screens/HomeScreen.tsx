import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import BasicLayout from '@/components/layout/BasicLayout'
import Title from '@/components/text/Title'
import { commonColor } from '@/constants/Colors'
import { useApi } from '@/hooks/useApi'
import { getCategoryJoke } from '@/services/axios.services'

export default function HomeScreen() {
	const { loading, error, data } = useApi(getCategoryJoke, {
		autoFetch: true,
		params: 1,
	})
	const navigation = useNavigation()
	return (
		<BasicLayout>
			<View style={{ flex: 1, paddingTop: 10 }}>
				<Title>Chuck Norris APP</Title>
				<View
					style={{
						flexDirection: 'row',
						flexWrap: 'wrap',
						gap: 12,
						justifyContent: 'center',
					}}
				>
					{data &&
						data?.length > 0 &&
						data.map((info) => (
							<TouchableOpacity
								key={info}
								onPress={() => navigation.navigate('Joke', { category: info })}
								style={[styles.button, { backgroundColor: commonColor.buttonbg }]}
							>
								<Text
									style={{
										fontWeight: 'bold',
										color: commonColor.textbg,
										fontSize: 18,
									}}
								>
									{info}
								</Text>
							</TouchableOpacity>
						))}
				</View>
			</View>
		</BasicLayout>
	)
}
const styles = StyleSheet.create({
	button: {
		width: 'auto',
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 8,
	},
})
