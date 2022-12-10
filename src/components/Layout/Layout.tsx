import { authListener } from '@/util/auth'
import { notificationClickListener, receivedNotificationListener } from '@/util/notifications'
import { Subscription } from 'expo-apple-authentication'
import { removeNotificationSubscription } from 'expo-notifications'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

type Props = {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  const notiListener = useRef<Subscription | undefined>()
  const clickListener = useRef<Subscription | undefined>()
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = authListener(dispatch)
    notiListener.current = receivedNotificationListener
    clickListener.current = notificationClickListener

    return () => {
      if (notiListener?.current) removeNotificationSubscription(notiListener.current)
      if (clickListener?.current) removeNotificationSubscription(clickListener.current)
      unsubscribe()
    }
  }, [])

  return <>{children}</>
}

export default Layout
