import { createStaticNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import BasicLayout from '@/components/layout/BasicLayout'
import FavoriteScreen from '@/Screens/FavoriteScreen'
import HomeScreen from '@/Screens/HomeScreen'
import JokeScreen from '@/Screens/JokeScreen'
import LoginScreen from '@/Screens/LoginScreen'
import SignoutScreen from '@/Screens/SignoutScreen'

const RootStack = createNativeStackNavigator({
	initialRouteName: 'Login',
	screenOptions: {
		headerShown: false,
	},
	screens: {
		Home: { screen: HomeScreen },
		Favorite: { screen: FavoriteScreen },
		Joke: { screen: JokeScreen },
		Login: { screen: LoginScreen },
		signout: { screen: SignoutScreen },
	},
})

export const NavigationApp = createStaticNavigation(RootStack)
