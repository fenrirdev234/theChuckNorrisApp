import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
	createStaticNavigation,
	NavigationContainer,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { useSession } from '@/context/SessionProvider'
import FavoriteScreen from '@/Screens/FavoriteScreen'
import HomeScreen from '@/Screens/HomeScreen'
import JokeScreen from '@/Screens/JokeScreen'
import LoginScreen from '@/Screens/LoginScreen'
import SearchScreen from '@/Screens/SearchScreen'
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
const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const TabNav = () => {
	return (
		<Tab.Navigator tabBar={(props) => <CustomBottomTab {...props} />}>
			<Tab.Screen
				name='Home'
				component={HomeScreen}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name='Joke'
				component={JokeScreen}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name='Favorite'
				component={FavoriteScreen}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name='Search'
				component={SearchScreen}
				options={{ headerShown: false }}
			/>
		</Tab.Navigator>
	)
}

const RootNav = () => {
	const { user, signOut } = useSession()

	return (
		<Stack.Navigator>
			{user ? (
				<Stack.Screen
					name='HomeTabs'
					component={TabNav}
					options={{ headerShown: false }}
				/>
			) : (
				<>
					<Stack.Screen
						name='Login'
						component={LoginScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name='Signup'
						component={SignupScreen}
						options={{ headerShown: false }}
					/>
				</>
			)}
		</Stack.Navigator>
	)
}

export const NavigationRouter = () => {
	return (
		<NavigationContainer>
			<RootNav />
		</NavigationContainer>
	)
}
