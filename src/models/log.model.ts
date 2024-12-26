import { z } from 'zod'

export const loginSchema = z.object({
	email: z.string().email('invalid email').min(1, 'the email is required'),
	password: z.string().min(6, 'The password must be at least 6 characters long'),
})

export type ILoginFormValue = z.infer<typeof loginSchema>

export const createSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Invalid email').min(1, 'Email is required'),
	password: z.string().min(6, 'The password must be at least 6 characters long'),
})

export type ICreateFormValue = z.infer<typeof createSchema>
