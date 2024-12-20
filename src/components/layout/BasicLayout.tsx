import { ReactNode } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function BasicLayout({ children }: { children: ReactNode }) {
	const inset = useSafeAreaInsets()
	return (
		<View
			style={{
				paddingBottom: inset.bottom,
				paddingTop: inset.top,

				flex: 1,
			}}
		>
			{children}
		</View>
	)
}
