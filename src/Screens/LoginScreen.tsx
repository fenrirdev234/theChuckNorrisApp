/* import { useNavigation } from '@react-navigation/native' */
import { useState } from 'react'
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'

import LogLayout from '@/components/layout/LogLayout'

export default function LoginScreen() {
	/* 	const navigation = useNavigation() */
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const onHandleLogin = () => {}

	return (
		<LogLayout>
			<Text style={styles.title} className='text pb-[24] font-bold'>
				Log In
			</Text>
			<TextInput
				style={styles.input}
				placeholder='Enter email'
				autoCapitalize='none'
				keyboardType='email-address'
				textContentType='emailAddress'
				autoFocus={true}
				value={email}
				onChangeText={(text) => setEmail(text)}
			/>
			<TextInput
				style={styles.input}
				placeholder='Enter password'
				autoCapitalize='none'
				autoCorrect={false}
				secureTextEntry={true}
				textContentType='password'
				value={password}
				onChangeText={(text) => setPassword(text)}
			/>
			<TouchableOpacity
				style={styles.button}
				className='bg-buttonBg'
				onPress={onHandleLogin}
			>
				<Text className='text-button-text-color font-bold' style={{ fontSize: 18 }}>
					{' '}
					Log In
				</Text>
			</TouchableOpacity>
			<View
				style={{
					marginTop: 20,
					flexDirection: 'row',
					alignItems: 'center',
					alignSelf: 'center',
				}}
			>
				<Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>
					Don't have an account?{' '}
				</Text>
				<TouchableOpacity /*  onPress={() => navigation.navigate('Signup')} */>
					<Text className='text-buttonBg text-{14} font-semibold'> Sign Up</Text>
				</TouchableOpacity>
			</View>
		</LogLayout>
	)
}

const styles = StyleSheet.create({
	title: {
		fontSize: 36,
		color: 'orange',
		alignSelf: 'center',
	},
	input: {
		backgroundColor: '#F6F7FB',
		height: 58,
		marginBottom: 20,
		fontSize: 16,
		borderRadius: 10,
		padding: 12,
	},
	backImage: {
		width: '100%',
		height: 340,
		position: 'absolute',
		top: 0,
		resizeMode: 'cover',
	},

	button: {
		backgroundColor: '#f57c00',
		height: 58,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 40,
	},
})
