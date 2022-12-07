import { LoginEnum, loginMap } from '@/models/Auth'
import AuthButton from '@/screens/Auth/components/AuthButton'
import { animateVal } from '@/util/helpers'
import { useEffect, useRef, useState } from 'react'
import { Animated, ImageBackground, ImageSourcePropType } from 'react-native'
import { styles } from './Auth.styles'
import { AuthScreenProps } from './Auth.types'
import GuestButton from './components/GuestButton'

const AuthScreen: AuthScreenProps = () => {
  const overlayOpacity = useRef(new Animated.Value(0)).current
  const [isLoading, setIsLoading] = useState<LoginEnum>()
  const imageMap: { [idx in Exclude<LoginEnum, LoginEnum.GUEST>]: ImageSourcePropType } = {
    [LoginEnum.APPLE]: require('@/images/auth/login_apple.png'),
    [LoginEnum.GOOGLE]: require('@/images/auth/login_google.png'),
  }

  const handleLogin = (method: LoginEnum) => {
    setIsLoading(method)
    setTimeout(() => setIsLoading(undefined), 2000)
  }

  const handleGuestLogin = () => {
    setIsLoading(LoginEnum.GUEST)
    setTimeout(() => setIsLoading(undefined), 2000)
  }

  useEffect(() => {
    animateVal(overlayOpacity, 0.5, 1000, false)
  }, [])

  return (
    <ImageBackground
      style={{ width: '100%', height: '100%' }}
      resizeMode="cover"
      source={require('@/images/app/splash.png')}>
      <Animated.View
        style={{
          ...styles.container,
          backgroundColor: overlayOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(0,0,0,0)', 'rgba(0, 0,0,1)'],
          }),
        }}>
        {loginMap.map(loginMethod => (
          <AuthButton
            key={loginMethod}
            text={`Sign in with ${
              loginMethod.charAt(0).toUpperCase() + loginMethod.slice(1).toLowerCase()
            }`}
            image={imageMap[loginMethod]}
            variant={loginMethod}
            onPress={() => handleLogin(loginMethod)}
            isLoading={isLoading === loginMethod}
            disabled={isLoading !== undefined}
          />
        ))}
        <GuestButton onPress={handleGuestLogin} />
      </Animated.View>
    </ImageBackground>
  )
}

export default AuthScreen
