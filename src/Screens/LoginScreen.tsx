import { StyleSheet, Text, View } from 'react-native'

export default function LoginScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>LoginScreen</Text>
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'red',

		justifyContent: 'center',
	},
	text: {
		textAlign: 'center',
	},
})
