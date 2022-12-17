import { animateVal, loadAssetsAsync } from '@/util/helpers'
import { getRandomNum } from 'functions/src/helpers/helpers'
import React, { useEffect, useRef } from 'react'
import { Animated, Image, View } from 'react-native'
import ProfilePic from '../ProfilePic'
import { cloudMove, styles } from './MountainBg.styles'

const MountainBg = () => {
  const cloud1 = useRef(new Animated.Value(0)).current
  const cloud2 = useRef(new Animated.Value(0)).current
  const cloud3 = useRef(new Animated.Value(0)).current
  const cloud4 = useRef(new Animated.Value(0)).current
  const cloud5 = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const clouds = [cloud1, cloud2, cloud3, cloud4, cloud5]
    clouds.forEach(cloud =>
      animateVal(cloud, getRandomNum(6, 10), getRandomNum(7000, 11000), false),
    )
  }, [])

  useEffect(() => {
    loadAssetsAsync({
      images: [
        require('@/images/bg/mountains/7.png'),
        require('@/images/bg/mountains/6.png'),
        require('@/images/bg/mountains/5.png'),
        require('@/images/bg/mountains/4.png'),
        require('@/images/bg/mountains/3.png'),
        require('@/images/bg/mountains/2.png'),
        require('@/images/bg/mountains/1.png'),
      ],
    })
  }, [])

  return (
    <View style={styles.container}>
      <Image source={require('@/images/bg/mountains/7.png')} style={styles.image} />
      <Animated.Image
        source={require('@/images/bg/mountains/6.png')}
        style={{ ...styles.cloudLayer, left: cloudMove(cloud5) }}
      />
      <Image source={require('@/images/bg/mountains/5.png')} style={styles.imageLayer} />
      <Animated.Image
        source={require('@/images/bg/mountains/4.png')}
        style={{ ...styles.cloudLayer, left: cloudMove(cloud1) }}
      />
      <Animated.Image
        source={require('@/images/bg/mountains/3.png')}
        style={{ ...styles.cloudLayer, right: cloudMove(cloud2) }}
      />
      <Animated.Image
        source={require('@/images/bg/mountains/2.png')}
        style={{ ...styles.cloudLayer, left: cloudMove(cloud3) }}
      />
      <Animated.Image
        source={require('@/images/bg/mountains/1.png')}
        style={{ ...styles.cloudLayer, right: cloudMove(cloud4) }}
      />
      <ProfilePic />
    </View>
  )
}

export default MountainBg
