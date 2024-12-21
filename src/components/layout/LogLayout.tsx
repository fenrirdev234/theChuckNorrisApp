import { ReactNode } from 'react'
import { StatusBar, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function LogLayout({
	children,
}: {
	children: ReactNode | ReactNode[]
}) {
	return (
		<View className='dark:bg-dbgcolor bg-bgcolor flex-1'>
			{/* 			<View style={styles.whiteSheet} /> */}
			<SafeAreaView className='mx-[30] flex-1 justify-center'>
				{children}
			</SafeAreaView>
			<StatusBar barStyle='light-content' />
		</View>
	)
}

/* const styles = StyleSheet.create({


	whiteSheet: {
		width: '100%',
		height: '75%',
		position: 'absolute',
		bottom: 0,
		backgroundColor: '#dd5555',
	},
})
 */
