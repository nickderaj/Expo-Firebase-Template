import Title from '@/components/Title'
import { RootState } from '@/redux/store'
import { logOut } from '@/util/auth'
import { loadAssetsAsync, logEvent } from '@/util/helpers'
import { deviceWidth } from '@/util/styles'
import React, { useEffect, useState } from 'react'
import { Pressable, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import MountainBg from './components/MountainBg'
import { styles } from './Profile.styles'
import { ProfileScreenProps } from './Profile.types'

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { userObj } = useSelector((state: RootState) => state.user)
  const [loggingOut, setLoggingOut] = useState<boolean>(false)
  const dispatch = useDispatch()

  const handleLogout = async () => {
    setLoggingOut(true)
    logEvent('logout', { user: userObj?.id })
    await loadAssetsAsync({ images: [require('@/images/app/splash.png')] })
    await logOut(dispatch)
    setLoggingOut(false)
  }

  const handleBack = () => navigation.replace('Home')

  useEffect(() => {
    logEvent('view_profile')
  }, [])

  return (
    <View style={styles.container}>
      <MountainBg />
      <View style={styles.menuWrapper}>
        <Title variant="light" style={{ paddingTop: deviceWidth * 0.225, paddingBottom: 8 }}>
          {userObj?.username}
        </Title>
        <View style={styles.menu}>
          <Pressable onPress={handleLogout} disabled={loggingOut}>
            <Title variant="orange" style={{ paddingVertical: 24 }}>
              Logout
            </Title>
          </Pressable>
          <Pressable onPress={handleBack} disabled={loggingOut}>
            <Title variant="light">Back</Title>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default ProfileScreen
