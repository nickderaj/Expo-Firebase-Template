import React from 'react'
import { Image, View } from 'react-native'
import { styles } from './ProfilePic.styles'

const ProfilePic = () => {
  return (
    <View style={styles.wrapper}>
      <Image source={require('@/images/icons/ui/ghost.png')} style={styles.image} />
    </View>
  )
}

export default ProfilePic
