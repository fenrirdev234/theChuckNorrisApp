import 'react-native-reanimated'

import { useNetInfo } from '@react-native-community/netinfo'
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import * as Notifications from 'expo-notifications'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useRef, useState } from 'react'
import { Platform } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

import { useColorScheme } from '@/hooks/useColorScheme'

import { NavigationApp } from './components/navigation/AppRouter'
import { SessionProvider } from './context/SessionProvider'
import { registerForPushNotificationsAsync } from './lib/expo/Notification'
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
	}),
})

export default function App() {
	const { isConnected } = useNetInfo()
	const colorScheme = useColorScheme()
	const [loaded] = useFonts({
		SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
	})

	if (!isConnected) {
		Toast.show({
			type: 'error',
			text1: 'internet connection',
			text2: 'OH no, you are offline',
		})
	}

	const [expoPushToken, setExpoPushToken] = useState('')
	const [channels, setChannels] = useState<Notifications.NotificationChannel[]>(
		[],
	)
	const [notification, setNotification] = useState<
		Notifications.Notification | undefined
	>(undefined)
	const notificationListener = useRef<Notifications.EventSubscription>()
	const responseListener = useRef<Notifications.EventSubscription>()

	useEffect(() => {
		registerForPushNotificationsAsync().then(
			(token) => token && setExpoPushToken(token),
		)

		if (Platform.OS === 'android') {
			Notifications.getNotificationChannelsAsync().then((value) =>
				setChannels(value ?? []),
			)
		}
		notificationListener.current = Notifications.addNotificationReceivedListener(
			(notification) => {
				setNotification(notification)
			},
		)

		responseListener.current =
			Notifications.addNotificationResponseReceivedListener((response) => {
				console.log(response)
			})

		return () => {
			if (notificationListener.current) {
				Notifications.removeNotificationSubscription(notificationListener.current)
			}
			if (responseListener.current) {
				Notifications.removeNotificationSubscription(responseListener.current)
			}
		}
	}, [])

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
		}
	}, [loaded])

	if (!loaded) {
		return null
	}

	return (
		<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<SessionProvider>
				<SafeAreaProvider>
					<NavigationApp />
					<Toast />
					<StatusBar style='auto' />
				</SafeAreaProvider>
			</SessionProvider>
		</ThemeProvider>
	)
}
