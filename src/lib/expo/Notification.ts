import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'

import { getRandomJoke } from '@/services/axios.services'

export const registerForPushNotificationsAsync = async () => {
	let token

	if (Platform.OS === 'android') {
		await Notifications.setNotificationChannelAsync('myNotificationChannel', {
			name: 'A channel is needed for the permissions prompt to appear',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
		})
	}

	/* if (Device.isDevice) { */
	const { status: existingStatus } = await Notifications.getPermissionsAsync()
	let finalStatus = existingStatus
	if (existingStatus !== 'granted') {
		const { status } = await Notifications.requestPermissionsAsync()
		finalStatus = status
	}
	if (finalStatus !== 'granted') {
		alert('Failed to get push token for push notification!')
		return
	}

	try {
		const projectId =
			Constants?.expoConfig?.extra?.eas?.projectId ??
			Constants?.easConfig?.projectId
		if (!projectId) {
			throw new Error('Project ID not found')
		}
		token = (
			await Notifications.getExpoPushTokenAsync({
				projectId,
			})
		).data
	} catch (e) {
		token = `${e}`
	}
	/* } else {
		alert('Must use physical device for Push Notifications')
	} */

	return token
}

export const scheduleTodoNotification = async () => {
	try {
		const randomJoke = (await getRandomJoke().call).data.value

		await Notifications.scheduleNotificationAsync({
			content: {
				title: 'Hello and Chuck Norris Fact',
				body: randomJoke,
			},
			trigger: null,
		})
	} catch (e) {
		alert('Problem to connect with Chuck Norris API')
	}
}
