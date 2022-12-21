import { amplitudeApiKey } from '@/constants/project.constants'
import { RootState } from '@/redux/store'
import { authListener } from '@/util/auth'
import { clickNotificationListener, receivedNotificationListener } from '@/util/notifications'
import { init as initAmplitude } from '@amplitude/analytics-react-native'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type Props = {
  children: React.ReactNode
}

const AppLayout: React.FC<Props> = ({ children }) => {
  const { userObj } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = authListener(dispatch)
    initAmplitude(amplitudeApiKey)

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

  return <>{children}</>
}

export default AppLayout
