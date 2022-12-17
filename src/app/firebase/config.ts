import { firebaseConfig, projectRegion } from '@/constants/firebase.constants'
import { getFirestore } from '@firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getApp, getApps, initializeApp } from 'firebase/app'
import { Auth, getAuth, initializeAuth } from 'firebase/auth'
import { getReactNativePersistence } from 'firebase/auth/react-native'
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions'

let app
let auth: Auth

if (!getApps().length) {
  app = initializeApp(firebaseConfig)
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  })
} else {
  app = getApp()
  auth = getAuth(app)
}

const db = getFirestore(app)
const functions = getFunctions(app, __DEV__ ? 'us-central1' : projectRegion)
if (__DEV__) connectFunctionsEmulator(functions, '192.168.1.160', 5001) // local functions

export { auth, db, functions }
