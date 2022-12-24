import { Range } from 'functions/src/helpers/helpers'
import { ImageSourcePropType } from 'react-native'

export const mountainBgArray: string[] = [
  require('@/images/bg/auth/1.png'),
  require('@/images/bg/auth/2.png'),
  require('@/images/bg/auth/3.png'),
  require('@/images/bg/auth/4.png'),
  require('@/images/bg/auth/5.png'),
  require('@/images/bg/auth/6.png'),
  require('@/images/bg/auth/7.png'),
]

export const mountainBgMap: { [idx in Range<1, 8>]: ImageSourcePropType } = {
  1: require('@/images/bg/auth/1.png'),
  2: require('@/images/bg/auth/2.png'),
  3: require('@/images/bg/auth/3.png'),
  4: require('@/images/bg/auth/4.png'),
  5: require('@/images/bg/auth/5.png'),
  6: require('@/images/bg/auth/6.png'),
  7: require('@/images/bg/auth/7.png'),
}
