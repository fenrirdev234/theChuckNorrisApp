import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import { initializeApp } from 'firebase/app'
import { getReactNativePersistence, initializeAuth } from 'firebase/auth'

import {
	apiKey,
	appId,
	authDomain,
	messagingSenderId,
	projectId,
	storageBucket,
} from './secrets'

const firebaseConfig = {
	apiKey,
	authDomain,
	projectId,
	storageBucket,
	messagingSenderId,
	appId,
}
const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = initializeAuth(firebaseApp, {
	persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})
