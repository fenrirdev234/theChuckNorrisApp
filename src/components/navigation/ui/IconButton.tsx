import {
	Pressable,
	PressableProps,
	StyleProp,
	StyleSheet,
	ViewStyle,
} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export type IconLibrary = {
	[key: string]: () => React.ComponentType<any>
}

const ICON_LIBRARIES: IconLibrary = {
	Feather: () => Feather,
	MaterialCommunityIcons: () => MaterialCommunityIcons,
	// add more libraries as needed
}

export type IconButtonProps = PressableProps & {
	icon: string
	iconFamily?: 'Feather' | 'MaterialCommunityIcons'
	iconColor?: string
	style?: StyleProp<ViewStyle>
	onPress?: () => void
}

export const IconButton = ({
	icon,
	iconFamily = 'Feather',
	iconColor = 'white',
	style = {},
	onPress,
	...rest
}: IconButtonProps) => {
	const Icon = ICON_LIBRARIES[iconFamily]()

	const buttonStyles = [styles.button, style] as StyleProp<ViewStyle>

	return (
		<Pressable
			{...rest}
			onPress={onPress}
			style={({ pressed }) => [
				buttonStyles,
				pressed && styles.buttonPressed,
				pressed && styles.shadow,
			]}
		>
			<Icon name={icon} size={16} color={iconColor} />
		</Pressable>
	)
}

const styles = StyleSheet.create({
	button: {
		borderRadius: 40,
		alignItems: 'center',
		justifyContent: 'center',

		width: 36,
		height: 36,
	},
	buttonPressed: {
		opacity: 0.9,
	},
	textButton: {
		backgroundColor: 'transparent',
	},

	shadow: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.18,
		shadowRadius: 1.0,

		elevation: 1,
	},
})
