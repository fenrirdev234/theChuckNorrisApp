import { z } from 'zod'

const envSchema = z.object({
	EXPO_PUBLIC_API_KEY: z.string().min(1, 'apiKey is required'),
	EXPO_PUBLIC_AUTH_DOMAIN: z.string().min(1, 'authDomain is required'),
	EXPO_PUBLIC_PROJECT_ID: z.string().min(1, 'projectId is required'),
	EXPO_PUBLIC_STORAGE_BUCKET: z.string().min(1, 'storageBucket is required'),
	EXPO_PUBLIC_MESSAGING_SENDER_ID: z
		.string()
		.min(1, 'messagingSenderId is required'),
	EXPO_PUBLIC_APP_IP: z.string().min(1, 'appId is required'),
})

const { success, error, data } = envSchema.safeParse(process.env)

if (!success) {
	console.error('Error in env', error?.format())
	process.exit(1)
}

export const {
	EXPO_PUBLIC_API_KEY: apiKey,
	EXPO_PUBLIC_AUTH_DOMAIN: authDomain,
	EXPO_PUBLIC_PROJECT_ID: projectId,
	EXPO_PUBLIC_STORAGE_BUCKET: storageBucket,
	EXPO_PUBLIC_MESSAGING_SENDER_ID: messagingSenderId,
	EXPO_PUBLIC_APP_IP: appId,
} = data
