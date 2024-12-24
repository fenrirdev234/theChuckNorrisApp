import { StyleSheet, Text, TextProps } from 'react-native'

import { commonColor } from '@/constants/Colors'

export default function Title(props: TextProps) {
	return <Text style={[styles.title, { color: commonColor.title }]} {...props} />
}
const styles = StyleSheet.create({
	title: {
		fontSize: 36,
		fontWeight: 'bold',
		alignSelf: 'center',
		paddingBottom: 24,
	},
})
