import Button from '@/components/Button'
import Title from '@/components/Title'
import { setMusic, setSfx } from '@/redux/slices/configSlice'
import { RootState } from '@/redux/store'
import { clickSFXForced, musicOn, soundOn } from '@/util/audio'
import { logOut } from '@/util/auth'
import { clickHaptic, loadAssetsAsync, logEvent } from '@/util/helpers'
import { deviceWidth } from '@/util/styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Pressable, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import MountainBg from './components/MountainBg'
import { styles } from './Profile.styles'
import { ProfileScreenProps } from './Profile.types'

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { userObj } = useSelector((state: RootState) => state.user)
  const { sfx, music } = useSelector((state: RootState) => state.config)
  const [loggingOut, setLoggingOut] = useState<boolean>(false)
  const dispatch = useDispatch()

  const handleLogout = async () => {
    setLoggingOut(true)
    logEvent('logout', { user: userObj?.id })
    await loadAssetsAsync({ images: [require('@/images/app/splash.png')] })
    await logOut(dispatch)
    setLoggingOut(false)
  }

  const handleSfx = async () => {
    if (await soundOn()) {
      AsyncStorage.setItem('sfx', 'false')
      dispatch(setSfx(false))
    } else {
      clickHaptic()
      clickSFXForced()
      AsyncStorage.setItem('sfx', 'true')
      dispatch(setSfx(true))
    }
  }

  const handleMusic = async () => {
    if (await musicOn()) {
      AsyncStorage.setItem('music', 'false')
      dispatch(setMusic(false))
    } else {
      AsyncStorage.setItem('music', 'true')
      dispatch(setMusic(true))
    }
  }

  const handleBack = () => navigation.replace('Home')

  useEffect(() => {
    logEvent('view_profile')
  }, [])

  return (
    <View style={styles.container}>
      <MountainBg />
      <View style={styles.menuWrapper}>
        <Title variant="neutral100" style={{ paddingTop: deviceWidth * 0.225, paddingBottom: 8 }}>
          @{userObj?.username}
        </Title>
        <View style={styles.menu}>
          <Pressable onPress={handleSfx} disabled={loggingOut} style={{ paddingVertical: 12 }}>
            <Title variant="neutral100">SFX {sfx ? 'On' : 'Off'}</Title>
          </Pressable>

          <Button onPress={handleMusic} disabled={loggingOut} style={{ paddingVertical: 12 }}>
            <Title variant="neutral100">Music {music ? 'On' : 'Off'}</Title>
          </Button>

          <Button onPress={handleLogout} disabled={loggingOut} style={{ paddingVertical: 12 }}>
            <Title variant="primary500">Logout</Title>
          </Button>

          <Button onPress={handleBack} disabled={loggingOut} style={{ paddingTop: 48 }}>
            <Title variant="neutral100">Back</Title>
          </Button>
        </View>
      </View>
    </View>
  )
}

export default ProfileScreen
