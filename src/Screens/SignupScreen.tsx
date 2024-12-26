import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form'
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	useColorScheme,
	View,
} from 'react-native'
import Toast from 'react-native-toast-message'

import ControllerInput from '@/components/form/ControllerInput'
import FormButtom from '@/components/form/FormButtom'
import LogLayout from '@/components/layout/LogLayout'
import { Colors, commonColor } from '@/constants/Colors'
import { useSession } from '@/context/SessionProvider'
import { scheduleTodoNotification } from '@/lib/expo/Notification'
import { createSchema, ICreateFormValue } from '@/models/log.model'

export default function SignupScreen() {
	const navigation = useNavigation()
	const { signUp } = useSession()

	const { reset, control, handleSubmit } = useForm<ICreateFormValue>({
		resolver: zodResolver(createSchema),
		defaultValues: {
			password: '',
			email: '',
			name: '',
		},
		mode: 'onSubmit',
	})

	const onError = (error: FieldErrors<ICreateFormValue>) => {
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
			if (error.name) {
				Toast.show({
					type: 'error',
					text1: `Error password: ${error.name.type}`,
					text2: error.name.message,
				})
			}
		}
	}

	const onHandleSignup: SubmitHandler<ICreateFormValue> = async ({
		email,
		password,
		name,
	}) => {
		try {
			await signUp(email, password, name)
			scheduleTodoNotification()

			reset()
		} catch (err) {
			console.log('[handleRegister] ==>', err)
		}
	}
	const colorScheme = useColorScheme()

	return (
		<LogLayout>
			<Text style={[styles.title, { color: commonColor.title }]}>Sign up</Text>
			<ControllerInput
				control={control}
				placeholder='Enter Name'
				autoCapitalize='none'
				autoCorrect={false}
				textContentType='name'
				name={'name'}
			/>
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
			<FormButtom
				title='Create Account'
				onPress={handleSubmit(onHandleSignup, onError)}
			/>
			<View
				style={{
					marginTop: 20,
					flexDirection: 'row',
					alignItems: 'center',
					alignSelf: 'center',
				}}
			>
				<Text
					style={{
						color: Colors[colorScheme ?? 'light'].textDetail,
						fontWeight: '600',
						fontSize: 14,
					}}
				>
					Don't have an account?{' '}
				</Text>
				<TouchableOpacity onPress={() => navigation.navigate('Login')}>
					<Text
						style={{ color: commonColor.buttonbg, fontWeight: '600', fontSize: 14 }}
					>
						Log in
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
		alignSelf: 'center',
		paddingBottom: 24,
	},
	Image: {
		width: '100%',
		height: 340,
		position: 'absolute',
		top: 0,
		resizeMode: 'cover',
	},
	button: {
		height: 58,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 40,
	},
})
