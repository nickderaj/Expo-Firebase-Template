import { amplitudeApiKey } from '@/constants/project.constants'
import { RootState } from '@/redux/store'
import { loadAudio, pauseAudio, playAudio } from '@/util/audio'
import { authListener } from '@/util/auth'
import { notificationInit } from '@/util/notification'
import { init as initAmplitude } from '@amplitude/analytics-react-native'
import { Audio } from 'expo-av'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type Props = {
  children: React.ReactNode
}

const AppLayout: React.FC<Props> = ({ children }) => {
  const { music } = useSelector((state: RootState) => state.config)
  const sound = useRef(new Audio.Sound()) // music
  const dispatch = useDispatch()

  useEffect(() => {
    // OneSignal
    notificationInit()
    // Amplitude
    if (!__DEV__) initAmplitude(amplitudeApiKey)
    // App
    const unsubscribe = authListener(dispatch)
    loadAudio(sound)

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (music) playAudio(sound)
    if (!music) pauseAudio(sound)
  }, [music])

  return <>{children}</>
}

export default AppLayout
