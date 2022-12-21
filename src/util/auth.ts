import { auth } from '@/firebase/config'
import { LoginEnum } from '@/models/Auth'
import { clearAuth, setEmail, setLoginMethod, setName } from '@/redux/slices/authSlice'
import { setUser } from '@/redux/slices/userSlice'
import { identify, Identify, reset, setUserId } from '@amplitude/analytics-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Dispatch } from '@reduxjs/toolkit'
import { AppleAuthenticationScope, signInAsync } from 'expo-apple-authentication'
import { CryptoDigestAlgorithm, digestStringAsync } from 'expo-crypto'
import { hideAsync } from 'expo-splash-screen'
import {
  GoogleAuthProvider,
  OAuthProvider,
  signInAnonymously,
  signInWithCredential,
  signOut,
} from 'firebase/auth'
import { Alert, Platform } from 'react-native'
import { login } from 'src/api/auth.api'
import { logEvent } from './helpers'

export const authListener = (dispatch: Dispatch) =>
  auth.onAuthStateChanged(async user => {
    try {
      if (!user) return

      const loginMethod = (await AsyncStorage.getItem('loginMethod')) as LoginEnum
      const res = await login(user.uid, loginMethod || LoginEnum.GOOGLE)
      const { userObj } = res.data

      // Amplitude
      setUserId(user.uid)
      const identifyObj = new Identify()
      identifyObj.set('email', user.email || '')
      identifyObj.set('name', user.displayName || '')
      identify(identifyObj)

      dispatch(setUser(userObj))
    } catch (error) {
      console.log('Auth Error: ', error)
    } finally {
      setTimeout(() => hideAsync(), 200)
    }
  })

export const logOut = async (dispatch: Dispatch) => {
  try {
    await AsyncStorage.clear() // clear local storage
    await signOut(auth) // sign out of firebase
    dispatch(clearAuth()) // clear redux state
    reset() // reset amplitude
  } catch (error) {
    console.log('Log Out Error: ', error)
  }
}

export const googleAuth = {
  clientId: 'INSERT_GOOGLE_CLIENT_ID',
  iosClientId: 'INSERT_IOS_CLIENT_ID',
  androidClientId: 'INSERT_ANDROID_CLIENT_ID',
}

export const googleLogin = async (dispatch: Dispatch, googleRes: any) => {
  try {
    logEvent('login_tap', { method: 'google' })
    dispatch(setLoginMethod(LoginEnum.GOOGLE))
    AsyncStorage.setItem('loginMethod', LoginEnum.GOOGLE)

    const { id_token } = googleRes.params
    if (!id_token) return Alert.alert('Error', 'Failed to log in, please try again later.')

    const credential = GoogleAuthProvider.credential(id_token)
    const res = await signInWithCredential(auth, credential)
    dispatch(setEmail(res.user.email || ''))
    dispatch(setName(res.user.displayName || ''))

    logEvent('login', { name: res.user.displayName, email: res.user.email, method: 'google' })
  } catch (error) {
    Alert.alert('Error', 'Failed to log in, please try again later.')
    console.log('Google Login Error: ', error)
  }
}

export const handleAppleLogin = async (dispatch: Dispatch) => {
  try {
    logEvent('login_tap', { method: 'apple' })
    if (Platform.OS !== 'ios') throw new Error('Not on iOS')

    const state = Math.random().toString(36).substring(2, 15)
    const rawNonce = Math.random().toString(36).substring(2, 10)
    const requestedScopes = [AppleAuthenticationScope.FULL_NAME, AppleAuthenticationScope.EMAIL]
    const nonce = await digestStringAsync(CryptoDigestAlgorithm.SHA256, rawNonce)

    dispatch(setLoginMethod(LoginEnum.APPLE))
    AsyncStorage.setItem('loginMethod', LoginEnum.APPLE)

    const { identityToken } = await signInAsync({
      requestedScopes,
      state,
      nonce,
    })
    if (!identityToken) throw new Error('No identity token provided.')

    const provider = new OAuthProvider('apple.com')
    provider.addScope('email')
    provider.addScope('fullName')

    const credential = provider.credential({
      idToken: identityToken,
      rawNonce: rawNonce,
    })

    const res = await signInWithCredential(auth, credential)
    dispatch(setEmail(res.user.email || ''))
    dispatch(setName(res.user.displayName || ''))
    logEvent('login', { name: res.user.displayName, email: res.user.email, method: 'apple' })
  } catch (error: any) {
    if (error?.code === 'ERR_CANCELED') return
    Alert.alert('Error', 'Failed to log in, please try again later.')
    console.log('Apple Login Error: ', error)
  }
}

export const handleGuestLogin = async (dispatch: Dispatch) => {
  try {
    logEvent('login_tap', {
      method: 'guest',
    })

    dispatch(setLoginMethod(LoginEnum.GUEST))
    AsyncStorage.setItem('loginMethod', LoginEnum.GUEST)

    const res = await signInAnonymously(auth)
    dispatch(setEmail(res.user.email || ''))
    dispatch(setName(res.user.displayName || ''))
    logEvent('login', { name: 'guest', email: 'guest', method: 'guest' })
  } catch (error: any) {
    if (error?.code === 'ERR_CANCELED') return
    console.error(error)
  }
}
