import { amplitudeApiKey } from '@/constants/project.constants'
import { RootState } from '@/redux/store'
import { loadAudio, pauseAudio, playAudio } from '@/util/audio'
import { authListener } from '@/util/auth'
import { clickNotificationListener, receivedNotificationListener } from '@/util/notifications'
import { init as initAmplitude } from '@amplitude/analytics-react-native'
import { Audio } from 'expo-av'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type Props = {
  children: React.ReactNode
}

const AppLayout: React.FC<Props> = ({ children }) => {
  const { userObj } = useSelector((state: RootState) => state.user)
  const { music } = useSelector((state: RootState) => state.config)
  const sound = useRef(new Audio.Sound()) // music
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = authListener(dispatch)
    if (!__DEV__) initAmplitude(amplitudeApiKey)
    loadAudio(sound)

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!userObj?.id) return
    const clickSubscription = clickNotificationListener(userObj.id)
    const recSubscription = receivedNotificationListener(userObj.id)

    return () => {
      clickSubscription.remove()
      recSubscription.remove()
    }
  }, [userObj?.id])

  useEffect(() => {
    if (music) playAudio(sound)
    if (!music) pauseAudio(sound)
  }, [music])

  return <>{children}</>
}

export default AppLayout
