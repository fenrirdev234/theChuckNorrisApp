import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import { commonColor } from '@/constants/Colors'
interface IFormInput {
	onPress: () => void
	title: string
}
export default function FormButtom({ onPress, title }: IFormInput) {
	return (
		<TouchableOpacity
			style={[styles.button, { backgroundColor: commonColor.buttonbg }]}
			onPress={onPress}
		>
			<Text
				style={{ fontWeight: 'bold', color: commonColor.textbg, fontSize: 18 }}
			>
				{title}
			</Text>
		</TouchableOpacity>
	)
}
const styles = StyleSheet.create({
	button: {
		height: 58,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 16,
	},
})
