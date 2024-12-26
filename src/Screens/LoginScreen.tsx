import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'

import ControllerInput from '@/components/form/ControllerInput'
import FormButtom from '@/components/form/FormButtom'
import LogLayout from '@/components/layout/LogLayout'
/* import { firebaseAuth } from '@/config/firebase' */
import { commonColor } from '@/constants/Colors'
import { useSession } from '@/context/SessionProvider'
import { scheduleTodoNotification } from '@/lib/expo/Notification'
import { ILoginFormValue, loginSchema } from '@/models/log.model'

export default function LoginScreen() {
	const navigation = useNavigation()
	const { signIn } = useSession()

	const { reset, control, handleSubmit } = useForm<ILoginFormValue>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			password: '',
			email: '',
		},
		mode: 'onSubmit',
	})

	const onError = (error: FieldErrors<ILoginFormValue>) => {
		if (error.email) {
			Toast.show({
				type: 'error',
				text1: `Error email: ${error.email.type}`,
				text2: error.email.message,
			})
			if (error.password) {
				Toast.show({
					type: 'error',
					text1: `Error password: ${error.password.type}`,
					text2: error.password.message,
				})
			}
		}
	}

	const onHandleLogin: SubmitHandler<ILoginFormValue> = async ({
		email,
		password,
	}) => {
		try {
			await signIn(email, password)
			scheduleTodoNotification()
			reset()
			navigation.navigate('Home')
		} catch (err) {
			console.log('[handleLogin] ==>', err)
			return null
		}
	}

	return (
		<LogLayout>
			<Text style={[styles.title, { color: commonColor.title }]}>Log In</Text>
			<ControllerInput
				control={control}
				placeholder='Enter email'
				autoCapitalize='none'
				keyboardType='email-address'
				textContentType='emailAddress'
				autoFocus={true}
				name='email'
			/>
			<ControllerInput
				control={control}
				placeholder='Enter password'
				autoCapitalize='none'
				autoCorrect={false}
				secureTextEntry={true}
				textContentType='password'
				name='password'
			/>

			<FormButtom title='Log in' onPress={handleSubmit(onHandleLogin, onError)} />
			<View
				style={{
					marginTop: 20,
					flexDirection: 'row',
					alignItems: 'center',
					alignSelf: 'center',
				}}
			>
				<Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>
					Don't you have an account?
				</Text>
				<TouchableOpacity onPress={() => navigation.navigate('Signup')}>
					<Text
						style={{ color: commonColor.buttonbg, fontWeight: '600', fontSize: 14 }}
					>
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
	button: {
		height: 58,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 40,
	},
})
