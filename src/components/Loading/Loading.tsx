import React from 'react'
import { Text, View } from 'react-native'
import { styles } from './Loading.styles'

const Loading: React.FC = () => {
  return (
    <View style={[styles.centered, styles.bgColor]}>
      <Text style={styles.text}>Loading...</Text>
    </View>
  )
}

export default Loading
