import React from 'react'
import { StyleSheet } from 'react-native'
import Animated, {
	SharedValue,
	useAnimatedStyle,
} from 'react-native-reanimated'

import { commonColor } from '@/constants/Colors'

type CircleProps = {
	circleX: SharedValue<number>
}
const circleContainerSize = 50

export default function AnimatedCircle({ circleX }: CircleProps) {
	const circleContainerStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: circleX.value - circleContainerSize / 2 }],
		}
	}, [])

	return (
		<Animated.View
			style={[
				circleContainerStyle,
				styles.container,
				{ backgroundColor: commonColor.buttonbg },
			]}
		/>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: -circleContainerSize / 1.1,
		width: circleContainerSize,
		borderRadius: circleContainerSize,
		height: circleContainerSize,
		justifyContent: 'center',
		alignItems: 'center',
	},
})
