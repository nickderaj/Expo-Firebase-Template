import { animateVal, loadAssetsAsync } from '@/util/helpers'
import { getRandomNum } from 'functions/src/helpers/helpers'
import React, { useEffect, useRef } from 'react'
import { Animated, Image, View } from 'react-native'
import ProfilePic from '../ProfilePic'
import { mountainBgArray, mountainBgMap } from './MountainBg.constants'
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
    loadAssetsAsync({ images: mountainBgArray })
  }, [])

  return (
    <View style={styles.container}>
      <Image source={mountainBgMap[7]} style={styles.image} />
      <Animated.Image
        source={mountainBgMap[6]}
        style={{ ...styles.cloudLayer, left: cloudMove(cloud5) }}
      />
      <Image source={mountainBgMap[5]} style={styles.imageLayer} />
      <Animated.Image
        source={mountainBgMap[4]}
        style={{ ...styles.cloudLayer, left: cloudMove(cloud1) }}
      />
      <Animated.Image
        source={mountainBgMap[3]}
        style={{ ...styles.cloudLayer, right: cloudMove(cloud2) }}
      />
      <Animated.Image
        source={mountainBgMap[2]}
        style={{ ...styles.cloudLayer, left: cloudMove(cloud3) }}
      />
      <Animated.Image
        source={mountainBgMap[1]}
        style={{ ...styles.cloudLayer, right: cloudMove(cloud4) }}
      />
      <ProfilePic />
    </View>
  )
}

export default MountainBg
