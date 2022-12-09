import { LoginEnum, loginMap } from '@/models/Auth'
import AuthButton from '@/screens/Auth/components/AuthButton'
import { googleAuth, googleLogin, handleAppleLogin, handleGuestLogin } from '@/util/auth'
import { animateVal, loadAssetsAsync } from '@/util/helpers'
import { useIdTokenAuthRequest } from 'expo-auth-session/build/providers/Google'
import { useEffect, useRef, useState } from 'react'
import { Animated, ImageBackground, ImageSourcePropType } from 'react-native'
import { useDispatch } from 'react-redux'
import { backgroundFade, imageFade, menuFade, styles } from './Auth.styles'
import GuestButton from './components/GuestButton'
import GuestModal from './components/GuestModal'

const AuthScreen: React.FC = () => {
  const overlayOpacity = useRef(new Animated.Value(0)).current
  const [isLoading, setIsLoading] = useState<LoginEnum>()
  const [showGuest, setShowGuest] = useState<boolean>(false)
  const dispatch = useDispatch()

  const imageMap: { [idx in Exclude<LoginEnum, LoginEnum.GUEST>]: ImageSourcePropType } = {
    [LoginEnum.APPLE]: require('@/images/icons/auth/login_apple.png'),
    [LoginEnum.GOOGLE]: require('@/images/icons/auth/login_google.png'),
  }

  const handleLogin = async (method: LoginEnum) => {
    setIsLoading(method)
    await loadAssetsAsync({ images: [require('@/images/app/splash.png')] })
    if (method === LoginEnum.GOOGLE) await handleGoogleLogin()
    if (method === LoginEnum.APPLE) await handleAppleLogin(dispatch, setIsLoading)
    if (method === LoginEnum.GUEST) await handleGuestLogin(dispatch, setIsLoading)
  }

  useEffect(() => {
    animateVal(overlayOpacity, 1, 1000, false)
  }, [])

  // Google Login
  const [_googleReq, googleRes, handleGoogleLogin] = useIdTokenAuthRequest(googleAuth)
  useEffect(() => {
    if (googleRes?.type === 'success') googleLogin(dispatch, googleRes, setIsLoading)
    if (googleRes?.type !== 'success') setIsLoading(undefined)
  }, [googleRes])

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
          guestLogin={() => handleLogin(LoginEnum.GUEST)}
          isLoading={isLoading}
        />
      )}
    </ImageBackground>
  )
}

export default AuthScreen
