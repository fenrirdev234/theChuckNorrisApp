import { ReactNode } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme.web'

export default function BasicLayout({
	children,
}: {
	children: ReactNode | ReactNode[]
}) {
	const colorScheme = useColorScheme()
	return (
		<View
			style={[
				{ flex: 1, backgroundColor: Colors[colorScheme ?? 'light'].bgColor },
			]}
		>
			<SafeAreaView
				style={{
					flex: 1,
					marginLeft: 30,
					marginRight: 20,
				}}
			>
				{children}
			</SafeAreaView>
		</View>
	)
}
