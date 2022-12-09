import Title from '@/components/Title'
import { logOut } from '@/util/auth'
import { loadAssetsAsync } from '@/util/helpers'
import { colors } from '@/util/styles'
import React, { useLayoutEffect, useState } from 'react'
import { Pressable, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { ProfileScreenProps } from './Profile.types'

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [loggingOut, setLoggingOut] = useState<boolean>(false)
  const dispatch = useDispatch()

  const handleLogout = async () => {
    setLoggingOut(true)
    await loadAssetsAsync({ images: [require('@/images/app/splash.png')] })
    await logOut(dispatch)
    setLoggingOut(false)
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
    })
  })

  return (
    <View
      style={{
        backgroundColor: colors.neutral300,
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Pressable onPress={handleLogout} disabled={loggingOut}>
        <Title>Logout</Title>
      </Pressable>
    </View>
  )
}

export default ProfileScreen
