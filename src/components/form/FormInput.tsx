import { StyleSheet, TextInput, TextInputProps } from 'react-native'

import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'

export default function FormInput(props: TextInputProps) {
	const colorScheme = useColorScheme()
	return (
		<TextInput
			{...props}
			style={[
				styles.input,
				{ backgroundColor: Colors[colorScheme ?? 'light'].bgColor2 },
			]}
		/>
	)
}

const styles = StyleSheet.create({
	input: {
		height: 48,
		marginBottom: 20,
		fontSize: 16,
		borderRadius: 10,
		padding: 12,
	},
})
