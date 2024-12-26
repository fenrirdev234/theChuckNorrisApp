import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'

import { Colors, commonColor } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme.web'
interface ICardJoke {
	joke?: string
	type: 'save' | 'delete'
	category?: string[]
	onPress: () => void
}

export default function CardJoke({
	joke,
	type = 'save',
	category,
	onPress,
}: ICardJoke) {
	const colorScheme = useColorScheme()
	return (
		<View>
			<View
				style={{
					backgroundColor: Colors[colorScheme ?? 'light'].cardbg,
					borderRadius: 12,
					paddingVertical: 12,
					paddingRight: 17,
					paddingLeft: 12,
					width: '94%',
				}}
			>
				<View
					style={{
						justifyContent: 'flex-end',
						flexDirection: 'row',
						flexWrap: 'wrap',
						position: 'absolute',
						top: 15,
						right: -20,
					}}
				>
					<TouchableOpacity
						onPress={onPress}
						style={{
							backgroundColor: commonColor.buttonbg,
							padding: 10,
							width: 'auto',
							flexDirection: 'column',
							borderRadius: '100%',
						}}
					>
						{type === 'delete' && (
							<AntDesignIcons name={'delete'} size={20} color={'white'} />
						)}
						{type === 'save' && (
							<AntDesignIcons name={'save'} size={20} color={'white'} />
						)}
					</TouchableOpacity>
				</View>

				<Text>{joke}</Text>

				<View style={{ flexDirection: 'row', paddingTop: 2 }}>
					<Text
						style={{ fontSize: 16, padding: 5, borderRadius: 6, fontWeight: 500 }}
					>
						Category:
					</Text>
					<View>
						{category &&
							category.length > 0 &&
							category.map((data) => (
								<Text
									key={data}
									style={{
										backgroundColor: commonColor.buttonbg,
										color: 'white',
										fontSize: 16,
										padding: 5,
										borderRadius: 6,
										fontWeight: 500,
									}}
								>
									{data}
								</Text>
							))}
					</View>
				</View>
			</View>
		</View>
	)
}
