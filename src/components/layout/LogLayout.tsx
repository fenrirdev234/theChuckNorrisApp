import { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme.web'

export default function LogLayout({
	children,
}: {
	children: ReactNode | ReactNode[]
}) {
	const colorScheme = useColorScheme()

	return (
		<View
			style={[
				styles.container,
				{ backgroundColor: Colors[colorScheme ?? 'light'].bgColor },
			]}
		>
			{/*  <Image source={} style={styles.backImage} />
 <View style={styles.whiteSheet} /> */}
			<SafeAreaView style={[styles.form]}>{children}</SafeAreaView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
