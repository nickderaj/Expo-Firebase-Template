import { LoginEnum } from '@/models/Auth'
import { animateVal } from '@/util/helpers'
import { colors } from '@/util/styles'
import { useEffect, useRef } from 'react'
import {
  ActivityIndicator,
  Animated,
  ImageSourcePropType,
  Pressable,
  PressableProps,
} from 'react-native'
import { styles } from './AuthButton.styles'

type AuthButtonProps = PressableProps & {
  text?: string
  image?: ImageSourcePropType
  variant: Exclude<LoginEnum, LoginEnum.GUEST>
  isLoading?: boolean
}

const AuthButton: React.FC<AuthButtonProps> = ({
  onPress,
  disabled,
  text,
  image,
  variant,
  isLoading,
}) => {
  const loadingRef = useRef(new Animated.Value(0)).current

  const bgMap = {
    [LoginEnum.GOOGLE]: colors.neutral100,
    [LoginEnum.APPLE]: colors.neutral900,
  }
  const textMap = {
    [LoginEnum.GOOGLE]: colors.neutral900,
    [LoginEnum.APPLE]: colors.neutral100,
  }

  useEffect(() => {
    if (isLoading) animateVal(loadingRef, 1, 300)
    if (!isLoading) animateVal(loadingRef, 0, 300)
  }, [isLoading])

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={{
        ...styles.container,
        backgroundColor: bgMap[variant],
        justifyContent: image ? 'space-around' : 'center',
      }}>
      <Animated.View
        style={{
          ...styles.activityIndicator,
          opacity: loadingRef.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        }}>
        <ActivityIndicator color={textMap[variant]} />
      </Animated.View>

      {image && (
        <Animated.Image
          resizeMode="contain"
          source={image}
          style={{
            ...styles.image,
            opacity: loadingRef.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0.2],
            }),
          }}
        />
      )}

      {text && (
        <Animated.Text
          style={{
            ...styles.text,
            color: textMap[variant],
            opacity: loadingRef.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0.2],
            }),
          }}>
          {text}
        </Animated.Text>
      )}
    </Pressable>
  )
}

export default AuthButton
