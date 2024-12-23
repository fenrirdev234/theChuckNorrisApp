import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
	User,
	UserCredential,
} from 'firebase/auth'

import { firebaseAuth } from '../../config/firebase'

export interface FirebaseUserResponse {
	user: User
}

export const getCurrentUser = async () => {
	try {
		return new Promise((resolve) => {
			const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
				unsubscribe()
				resolve(user ? { user } : null)
			})
		})
	} catch (error) {
		console.error('[error getting user] ==>', error)
		return null
	}
}

export async function login(
	email: string,
	password: string,
): Promise<FirebaseUserResponse | undefined> {
	try {
		const userCredential: UserCredential = await signInWithEmailAndPassword(
			firebaseAuth,
			email,
			password,
		)
		return { user: userCredential.user }
	} catch (e) {
		console.error('[error logging in] ==>', e)
		throw e
	}
}

export async function logout(): Promise<void> {
	try {
		await signOut(firebaseAuth)
	} catch (e) {
		console.error('[error logging out] ==>', e)
		throw e
	}
}

export async function register(
	email: string,
	password: string,
	name?: string,
): Promise<FirebaseUserResponse | undefined> {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			firebaseAuth,
			email,
			password,
		)
		if (name) {
			await updateProfile(userCredential.user, { displayName: name })
		}
		return { user: userCredential.user }
	} catch (e) {
		console.error('[error registering] ==>', e)
		throw e
	}
}
