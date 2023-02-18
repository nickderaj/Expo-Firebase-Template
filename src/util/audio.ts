import { store } from '@/redux/store'
import { Audio } from 'expo-av'

export const clickSFX = async () => {
  if (!store.getState().config.sfx) return
  const { sound } = await Audio.Sound.createAsync(require('@/audio/sfx/click.mp3'))
  await sound.playAsync()
}

export const clickSFXForced = async () => {
  const { sound } = await Audio.Sound.createAsync(require('@/audio/sfx/click.mp3'))
  await sound.playAsync()
}

export const playAudio = async (sound: React.MutableRefObject<Audio.Sound>) => {
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

export const loadAudio = async (sound: React.MutableRefObject<Audio.Sound>) => {
  await Audio.setAudioModeAsync({
    staysActiveInBackground: false,
    playsInSilentModeIOS: false,
    shouldDuckAndroid: true,
    playThroughEarpieceAndroid: true,
  })

  const checkloading = await sound.current.getStatusAsync()
  if (checkloading.isLoaded === true) return
  try {
    const result = await sound.current.loadAsync(
      require('@/audio/music/across_land_and_sea.mp3'),
      { isLooping: true },
      true,
    )
    if (!result.isLoaded) return console.log('Error in loading Audio')
    if (store.getState().config.music) playAudio(sound)
  } catch (error) {
    console.log(error)
  }
}
