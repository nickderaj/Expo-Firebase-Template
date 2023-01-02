import { setMusic } from '@/redux/slices/configSlice'
import { store } from '@/redux/store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Dispatch } from '@reduxjs/toolkit'
import { Audio } from 'expo-av'

export const soundOn = async (): Promise<boolean> => {
  const localStorage = await AsyncStorage.getItem('sfx')
  return localStorage === 'true' && store.getState().config.sfx
}

export const musicOn = async (): Promise<boolean> => {
  const localStorage = await AsyncStorage.getItem('music')
  return localStorage === 'true' && store.getState().config.music
}

export const clickSFX = async () => {
  if (!(await soundOn())) return

  const { sound } = await Audio.Sound.createAsync(require('@/audio/sfx/click.mp3'))
  await sound.playAsync()
}

export const clickSFXForced = async () => {
  const { sound } = await Audio.Sound.createAsync(require('@/audio/sfx/click.mp3'))
  await sound.playAsync()
}

export const playAudio = async (sound: React.MutableRefObject<Audio.Sound>) => {
  if (!(await musicOn())) return
  try {
    const result = await sound.current.getStatusAsync()
    if (result.isLoaded) {
      if (result.isPlaying === false) {
        sound.current.playAsync()
      }
    }
  } catch (error) {}
}

export const pauseAudio = async (sound: React.MutableRefObject<Audio.Sound>) => {
  try {
    const result = await sound.current.getStatusAsync()
    if (result.isLoaded) {
      if (result.isPlaying === true) {
        sound.current.pauseAsync()
      }
    }
  } catch (error) {}
}

export const loadAudio = async (sound: React.MutableRefObject<Audio.Sound>, dispatch: Dispatch) => {
  const checkloading = await sound.current.getStatusAsync()
  const localStorage = await AsyncStorage.getItem('music')
  if (localStorage === 'false') dispatch(setMusic(false))

  if (checkloading.isLoaded === true) return
  try {
    const result = await sound.current.loadAsync(
      require('@/audio/music/across_land_and_sea.mp3'),
      {},
      true,
    )
    if (!result.isLoaded) return console.log('Error in loading Audio')
    playAudio(sound)
  } catch (error) {
    console.log(error)
  }
}
