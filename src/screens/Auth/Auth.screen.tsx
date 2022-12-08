import { LoginEnum, loginMap } from '@/models/Auth'
import AuthButton from '@/screens/Auth/components/AuthButton'
import { animateVal } from '@/util/helpers'
import { useEffect, useRef, useState } from 'react'
import { Animated, ImageBackground, ImageSourcePropType } from 'react-native'
import { backgroundFade, imageFade, menuFade, styles } from './Auth.styles'
import GuestButton from './components/GuestButton'
import GuestModal from './components/GuestModal'

const AuthScreen: React.FC = () => {
  const overlayOpacity = useRef(new Animated.Value(0)).current
  const [isLoading, setIsLoading] = useState<LoginEnum>()
  const [showGuest, setShowGuest] = useState<boolean>(false)

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
    animateVal(overlayOpacity, 1, 1000, false)
  }, [])

  return (
    <ImageBackground
      style={{ width: '100%', height: '100%' }}
      resizeMode="cover"
      source={require('@/images/app/splash.png')}>
      <Animated.View
        style={{ ...styles.container, backgroundColor: backgroundFade(overlayOpacity) }}>
        <Animated.Image
          source={require('@/images/app/logo.png')}
          style={{
            ...styles.logo,
            opacity: overlayOpacity,
            transform: [{ translateY: imageFade(overlayOpacity) }],
          }}
          resizeMode="contain"
        />
        <Animated.View
          style={{
            opacity: overlayOpacity,
            transform: [{ translateY: menuFade(overlayOpacity) }],
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
        </Animated.View>
        <GuestButton onPress={() => setShowGuest(true)} disabled={isLoading !== undefined} />
      </Animated.View>
      {showGuest && (
        <GuestModal
          show={showGuest}
          setShow={setShowGuest}
          guestLogin={handleGuestLogin}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
    </ImageBackground>
  )
}

export default AuthScreen
