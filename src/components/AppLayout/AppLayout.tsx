import { amplitudeApiKey } from '@/constants/project.constants'
import { RootState } from '@/redux/store'
import { loadAudio, pauseAudio, playAudio } from '@/util/audio'
import { authListener } from '@/util/auth'
import { notificationInit } from '@/util/notification'
import { init as initAmplitude } from '@amplitude/analytics-react-native'
import { Audio } from 'expo-av'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../Loading'

type Props = {
  children: React.ReactElement
}

const AppLayout: React.FC<Props> = ({ children }) => {
  const { music } = useSelector((state: RootState) => state.config)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [finishedLoading, setFinishedLoading] = useState<boolean>(false)
  const sound = useRef(new Audio.Sound()) // music
  const dispatch = useDispatch()

  useEffect(() => {
    if (!__DEV__) notificationInit() // OneSignal
    if (!__DEV__) initAmplitude(amplitudeApiKey) // Amplitude
    const unsubscribe = authListener(dispatch) // Auth
    loadAudio(sound)

    // PRELOAD STUFF HERE
    setIsLoading(false)
    setTimeout(() => setFinishedLoading(true), 500)

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (music) playAudio(sound)
    if (!music) pauseAudio(sound)
  }, [music])

  return !finishedLoading ? <Loading isLoading={isLoading} /> : children
}

export default AppLayout
