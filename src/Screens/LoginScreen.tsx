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
			<Text style={styles.title}>Log In</Text>
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
			<TouchableOpacity style={styles.button} onPress={onHandleLogin}>
				<Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>
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
					<Text style={{ color: '#f57c00', fontWeight: '600', fontSize: 14 }}>
						{' '}
						Sign Up
					</Text>
				</TouchableOpacity>
			</View>
		</LogLayout>
	)
}

const styles = StyleSheet.create({
	title: {
		fontSize: 36,
		fontWeight: 'bold',
		color: 'orange',
		alignSelf: 'center',
		paddingBottom: 24,
	},
	input: {
		backgroundColor: '#F6F7FB',
		height: 58,
		marginBottom: 20,
		fontSize: 16,
		borderRadius: 10,
		padding: 12,
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
