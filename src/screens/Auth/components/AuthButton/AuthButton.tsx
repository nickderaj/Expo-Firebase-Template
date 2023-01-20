import Button from '@/components/Button'
import { LoginEnum } from '@/models/Auth'
import { animateVal } from '@/util/helpers'
import { colors } from '@/util/styles'
import { useEffect, useRef } from 'react'
import {
  ActivityIndicator,
  Animated,
  ImageSourcePropType,
  Platform,
  PressableProps,
} from 'react-native'
import { loadingFade, styles, textFade } from './AuthButton.styles'

type Props = PressableProps & {
  text?: string
  variant: Exclude<LoginEnum, LoginEnum.GUEST>
  isLoading?: boolean
}

const AuthButton: React.FC<Props> = ({ onPress, disabled, text, variant, isLoading }) => {
  const loadingRef = useRef(new Animated.Value(0)).current

  const imageMap: { [idx in Exclude<LoginEnum, LoginEnum.GUEST>]: ImageSourcePropType } = {
    [LoginEnum.APPLE]: require('@/images/icons/auth/login_apple.png'),
    [LoginEnum.GOOGLE]: require('@/images/icons/auth/login_google.png'),
    [LoginEnum.FACEBOOK]: require('@/images/icons/auth/login_fb.png'),
  }

  const image = imageMap[variant]

  const bgMap = {
    [LoginEnum.GOOGLE]: colors.neutral100,
    [LoginEnum.APPLE]: colors.neutral900,
    [LoginEnum.FACEBOOK]: colors.facebook,
  }
  const textMap = {
    [LoginEnum.GOOGLE]: colors.neutral900,
    [LoginEnum.APPLE]: colors.neutral100,
    [LoginEnum.FACEBOOK]: colors.neutral100,
  }

  useEffect(() => {
    if (isLoading) animateVal(loadingRef, 1, 300)
    if (!isLoading) animateVal(loadingRef, 0, 300)
  }, [isLoading])

  if (variant === LoginEnum.APPLE && Platform.OS !== 'ios') return null
  return (
    <Button
      onPress={onPress}
      disabled={disabled}
      style={{
        ...styles.container,
        backgroundColor: bgMap[variant],
        justifyContent: image ? 'space-around' : 'center',
      }}
    >
      <Animated.View style={{ ...styles.activityIndicator, opacity: loadingFade(loadingRef) }}>
        <ActivityIndicator color={textMap[variant]} />
      </Animated.View>

      {image && (
        <Animated.Image
          resizeMode="contain"
          source={image}
          style={{ ...styles.image, opacity: textFade(loadingRef) }}
        />
      )}

      {text && (
        <Animated.Text
          style={{ ...styles.text, color: textMap[variant], opacity: textFade(loadingRef) }}
        >
          {text}
        </Animated.Text>
      )}
    </Button>
  )
}

export default AuthButton
