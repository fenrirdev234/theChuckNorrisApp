import { ReactNode } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function LogLayout({
	children,
}: {
	children: ReactNode | ReactNode[]
}) {
	return (
		<View style={styles.container}>
			{/*  <Image source={} style={styles.backImage} />
 <View style={styles.whiteSheet} /> */}
			<SafeAreaView style={styles.form}>{children}</SafeAreaView>
			<StatusBar barStyle='light-content' />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	backImage: {
		width: '100%',
		height: 340,
		position: 'absolute',
		top: 0,
		resizeMode: 'cover',
	},
	whiteSheet: {
		width: '100%',
		height: '75%',
		position: 'absolute',
		bottom: 0,
		backgroundColor: '#fff',
		borderTopLeftRadius: 60,
	},
	form: {
		flex: 1,
		justifyContent: 'center',
		marginHorizontal: 30,
	},
})
