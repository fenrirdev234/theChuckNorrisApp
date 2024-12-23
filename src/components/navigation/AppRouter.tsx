import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStaticNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import FavoriteScreen from '@/Screens/FavoriteScreen'
import HomeScreen from '@/Screens/HomeScreen'
import JokeScreen from '@/Screens/JokeScreen'
import LoginScreen from '@/Screens/LoginScreen'
import SignupScreen from '@/Screens/SignupScreen'

import CustomBottomTab from './ui/CustomBottomtab'

const LogStack = createBottomTabNavigator({
	tabBar: (props) => <CustomBottomTab {...props} />,

	screens: {
		Home: { screen: HomeScreen, options: { headerShown: false } },
		Joke: { screen: JokeScreen, options: { headerShown: false } },
		Favorite: { screen: FavoriteScreen, options: { headerShown: false } },
	},
})

const RootStack = createNativeStackNavigator({
	initialRouteName: 'Login',
	screens: {
		Home: { screen: LogStack, options: { headerShown: false } },
		Login: { screen: LoginScreen, options: { headerShown: false } },
		Signup: { screen: SignupScreen, options: { headerShown: false } },
	},
})

export const NavigationApp = createStaticNavigation(RootStack)
