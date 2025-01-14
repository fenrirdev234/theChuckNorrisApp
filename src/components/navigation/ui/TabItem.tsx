import { useEffect } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import {
	useAnimatedProps,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'
import Animated from 'react-native-reanimated'
import Feather from 'react-native-vector-icons/Feather'

import { commonColor } from '@/constants/Colors'
import { SCREEN_WIDTH } from '@/constants/Screen'
import usePath from '@/hooks/usePath'
import { getPathXCenterByIndex } from '@/utils/Path'

export type TabProps = {
	label: string
	icon: string
	index: number
	activeIndex: number
	onTabPress: () => void
}
const ICON_SIZE = 25
const LABEL_WIDTH = SCREEN_WIDTH / 4
const AnimatedIcon = Animated.createAnimatedComponent(Feather)

const TabItem = ({ label, icon, index, activeIndex, onTabPress }: TabProps) => {
	const { curvedPaths } = usePath()
	const animatedActiveIndex = useSharedValue(activeIndex)
	const iconPosition = getPathXCenterByIndex(curvedPaths, index)
	const labelPosition = getPathXCenterByIndex(curvedPaths, index)

	const tabStyle = useAnimatedStyle(() => {
		const translateY = animatedActiveIndex.value - 1 === index ? -35 : 20
		const iconPositionX = iconPosition - index * ICON_SIZE
		return {
			width: ICON_SIZE,
			height: ICON_SIZE,
			transform: [
				{ translateY: withTiming(translateY) },
				{ translateX: iconPositionX - ICON_SIZE / 2 },
			],
		}
	})
	const labelContainerStyle = useAnimatedStyle(() => {
		const translateY = animatedActiveIndex.value - 1 === index ? 36 : 100
		return {
			transform: [
				{ translateY: withTiming(translateY) },
				{ translateX: labelPosition - LABEL_WIDTH / 2 },
			],
		}
	})
	const iconColor = useSharedValue(
		activeIndex === index + 1 ? 'white' : commonColor.textDetail,
	)

	//Adjust Icon color for this first render
	useEffect(() => {
		animatedActiveIndex.value = activeIndex
		if (activeIndex === index + 1) {
			iconColor.value = withTiming('white')
		} else {
			iconColor.value = withTiming(commonColor.textDetail)
		}
	}, [activeIndex])

	const animatedIconProps = useAnimatedProps(() => ({
		color: iconColor.value,
	}))
	return (
		<>
			<Animated.View style={[tabStyle]}>
				<Pressable
					testID={`tab${label}`}
					//Increasing touchable Area
					hitSlop={{ top: 30, bottom: 30, left: 50, right: 50 }}
					onPress={onTabPress}
				>
					<AnimatedIcon name={icon} size={25} animatedProps={animatedIconProps} />
				</Pressable>
			</Animated.View>
			<Animated.View style={[labelContainerStyle, styles.labelContainer]}>
				<Text style={[styles.label, { color: commonColor.textDetail }]}>
					{label}
				</Text>
			</Animated.View>
		</>
	)
}

export default TabItem

const styles = StyleSheet.create({
	labelContainer: {
		position: 'absolute',
		alignItems: 'center',
		width: LABEL_WIDTH,
	},
	label: {
		fontWeight: '500',
		fontSize: 17,
	},
})
