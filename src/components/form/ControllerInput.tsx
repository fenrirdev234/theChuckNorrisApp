import { Control, Controller, FieldError } from 'react-hook-form'
import { TextInputProps } from 'react-native'

import FormInput from './FormInput'

interface IControllerInput extends TextInputProps {
	name: string
	control: Control<any>
	error?: FieldError
}

export default function ControllerInput({
	name,
	control,
	...props
}: IControllerInput) {
	return (
		<Controller
			name={name}
			control={control}
			rules={{
				maxLength: 100,
			}}
			render={({ field: { onChange, value } }) => (
				<FormInput {...props} value={value} onChangeText={onChange} />
			)}
		/>
	)
}
