import 'react-native-reanimated'
import '../global.css'

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

import { NavigationApp } from './router/AppRouter'
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function App() {
	const colorScheme = useColorScheme()
	const [loaded] = useFonts({
		SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
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
			<SafeAreaProvider>
				<NavigationApp />
				<StatusBar style='auto' />
			</SafeAreaProvider>
		</ThemeProvider>
	)
}
