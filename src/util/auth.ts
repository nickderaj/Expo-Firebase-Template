import { auth } from '@/firebase/config'
import { setUser } from '@/redux/slices/userSlice'
import { Dispatch } from '@reduxjs/toolkit'
import { hideAsync } from 'expo-splash-screen'

export const authListener = (dispatch: Dispatch) =>
  auth.onAuthStateChanged(async user => {
    try {
      if (!user) return
      dispatch(setUser({ uid: user.uid }))
      console.log('logged in!')
    } catch (error) {
      console.log(error)
    } finally {
      hideAsync()
    }
  })
