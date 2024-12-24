import 'react-native-reanimated'

import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { useColorScheme } from '@/hooks/useColorScheme'

import { NavigationApp } from './components/navigation/AppRouter'
import { SessionProvider } from './context/SessionProvider'
import Toast from 'react-native-toast-message'
import { useNetInfo } from '@react-native-community/netinfo'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function App() {
	const { isConnected } = useNetInfo()
	const colorScheme = useColorScheme()
	const [loaded] = useFonts({
		SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
	})

	!isConnected &&
		Toast.show({
			type: 'error',
			text1: 'internet connection',
			text2: 'OH no, you are offline',
		})

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
