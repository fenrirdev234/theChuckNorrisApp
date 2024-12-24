import { ReactNode } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme.web'

export default function BasicLayout({
	children,
	isList,
}: {
	children: ReactNode | ReactNode[]
	isList?: boolean
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
					marginRight: isList ? 12 : 30,
				}}
			>
				{children}
			</SafeAreaView>
		</View>
	)
}
