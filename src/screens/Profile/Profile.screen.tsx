import Button from '@/components/Button'
import Title from '@/components/Title'
import { setMusic, setSfx, setVibrate } from '@/redux/slices/configSlice'
import { RootState } from '@/redux/store'
import { clickSFXForced } from '@/util/audio'
import { logOut } from '@/util/auth'
import { clickHaptic, logEvent } from '@/util/helpers'
import { deviceWidth } from '@/util/styles'
import React, { useEffect, useState } from 'react'
import { Pressable, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import MountainBg from './components/MountainBg'
import { styles } from './Profile.styles'
import { ProfileScreenProps } from './Profile.types'

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [loggingOut, setLoggingOut] = useState<boolean>(false)
  const { userObj } = useSelector((state: RootState) => state.user)
  const { music, sfx, vibrate } = useSelector((state: RootState) => state.config)
  const dispatch = useDispatch()

  const handleLogout = async () => {
    setLoggingOut(true)
    logEvent('logout', { user: userObj?.id })
    await logOut(dispatch)
    setLoggingOut(false)
  }

  const handleSfx = () => {
    if (!sfx) clickSFXForced()
    clickHaptic()
    dispatch(setSfx(!sfx))
  }

  const handleMusic = () => {
    dispatch(setMusic(!music))
  }

  const handleVibrate = () => {
    dispatch(setVibrate(!vibrate))
  }

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

          <Button onPress={handleVibrate} disabled={loggingOut} style={{ paddingVertical: 12 }}>
            <Title variant="neutral100">Vibrate {vibrate ? 'On' : 'Off'}</Title>
          </Button>

          <Button onPress={handleLogout} disabled={loggingOut} style={{ paddingVertical: 12 }}>
            <Title variant="primary500">Logout</Title>
          </Button>

          <Button
            onPress={() => navigation.goBack()}
            disabled={loggingOut}
            style={{ paddingTop: 48 }}
          >
            <Title variant="neutral100">Back</Title>
          </Button>
        </View>
      </View>
    </View>
  )
}

export default ProfileScreen
